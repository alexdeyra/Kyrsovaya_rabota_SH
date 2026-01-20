<?php
require __DIR__ . '/db.php';
kir_require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  kir_json(['ok'=>false,'error'=>'METHOD_NOT_ALLOWED'], 405);
}

$pdo = kir_db();
$data = kir_input_json();

$action = strtolower((string)($data['action'] ?? ''));
$sheetId = (int)($data['id'] ?? ($data['sheetId'] ?? 0));

if ($sheetId <= 0) {
  kir_json(['ok'=>false,'error'=>'NO_SHEET_ID'], 400);
}

if ($action !== 'close' && $action !== 'delete') {
  kir_json(['ok'=>false,'error'=>'UNKNOWN_ACTION'], 400);
}

$pdo->beginTransaction();
try {
  // Блокируем опись и связанную инвентаризацию, чтобы статусы считались консистентно.
  $st = $pdo->prepare('SELECT s.`id`, s.`inventory_id`, s.`is_closed` AS sheet_closed, i.`is_closed` AS inv_closed '
    . 'FROM `inventory_sheets` s '
    . 'JOIN `inventories` i ON i.`id` = s.`inventory_id` '
    . 'WHERE s.`id` = ? LIMIT 1 FOR UPDATE');
  $st->execute([$sheetId]);
  $row = $st->fetch();
  if (!$row) {
    $pdo->rollBack();
    kir_json(['ok'=>false,'error'=>'NOT_FOUND'], 404);
  }

  if ((int)$row['inv_closed'] === 1) {
    $pdo->rollBack();
    kir_json(['ok'=>false,'error'=>'INVENTORY_CLOSED','message'=>'Инвентаризация уже закрыта'], 400);
  }

  $invId = (int)$row['inventory_id'];
  $now = kir_now();

  if ($action === 'delete') {
    // Удаляем товары описи и саму опись
    $pdo->prepare('DELETE FROM `inventory_items` WHERE `sheet_id` = ?')->execute([$sheetId]);
    $pdo->prepare('DELETE FROM `inventory_sheets` WHERE `id` = ?')->execute([$sheetId]);
  }

  if ($action === 'close') {
    if ((int)$row['sheet_closed'] === 1) {
      // Уже закрыта — просто вернём ok
    } else {
      // Пересчитываем строки/количество по товарам описи
      $agg = $pdo->prepare('SELECT COUNT(*) AS line_count, COALESCE(SUM(`quantity`),0) AS qty FROM `inventory_items` WHERE `sheet_id` = ?');
      $agg->execute([$sheetId]);
      $a = $agg->fetch() ?: ['line_count'=>0,'qty'=>0];

      // updated_at может отсутствовать в старых БД — делаем фолбек без него.
      try {
        $upd = $pdo->prepare('UPDATE `inventory_sheets` SET `lines` = ?, `quantity` = ?, `is_closed` = 1, `status` = ?, `updated_at` = ? WHERE `id` = ?');
        $upd->execute([(int)$a['line_count'], (float)$a['qty'], 'completed', $now, $sheetId]);
      } catch (PDOException $e) {
        if (($e->getCode() === '42S22') || stripos($e->getMessage(), 'Unknown column') !== false) {
          $upd = $pdo->prepare('UPDATE `inventory_sheets` SET `lines` = ?, `quantity` = ?, `is_closed` = 1, `status` = ? WHERE `id` = ?');
          $upd->execute([(int)$a['line_count'], (float)$a['qty'], 'completed', $sheetId]);
        } else {
          throw $e;
        }
      }
    }
  }

  // Пересчёт инвентаризации (lines/amount) — amount = сумма фактическая по товарам
  $invAgg = $pdo->prepare(
    'SELECT COUNT(*) AS line_count, COALESCE(SUM(total_price),0) AS amount '
    . 'FROM inventory_items '
    . 'WHERE sheet_id IN (SELECT id FROM inventory_sheets WHERE inventory_id = ?)' 
  );
  $invAgg->execute([$invId]);
  $ia = $invAgg->fetch() ?: ['line_count'=>0,'amount'=>0];

  // updated_at может отсутствовать в старых БД — делаем фолбек без него.
  try {
    $pdo->prepare('UPDATE `inventories` SET `lines` = ?, `amount` = ?, `updated_at` = ? WHERE `id` = ?')
      ->execute([(int)$ia['line_count'], (float)$ia['amount'], $now, $invId]);
  } catch (PDOException $e) {
    if (($e->getCode() === '42S22') || stripos($e->getMessage(), 'Unknown column') !== false) {
      $pdo->prepare('UPDATE `inventories` SET `lines` = ?, `amount` = ? WHERE `id` = ?')
        ->execute([(int)$ia['line_count'], (float)$ia['amount'], $invId]);
    } else {
      throw $e;
    }
  }

  $pdo->commit();

  kir_json(['ok'=>true,'inventory'=>['id'=>$invId,'lines'=>(int)$ia['line_count'],'amount'=>(float)$ia['amount']], 'now'=>$now]);

} catch (Throwable $e) {
  if ($pdo->inTransaction()) $pdo->rollBack();
  kir_json(['ok'=>false,'error'=>'SHEET_ACTION_FAILED','message'=>$e->getMessage()], 500);
}
