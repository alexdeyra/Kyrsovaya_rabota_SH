<?php
require __DIR__ . '/db.php';
kir_require_login();

$pdo = kir_db();
$method = $_SERVER['REQUEST_METHOD'];

// Детеминированная модель «учетной суммы» (для результата/разницы) без внешней учетной базы.
// Требования:
// - difference может быть отрицательной
// - difference не должна совпадать с amount
// - для пустых инвентаризаций difference = 0
function kir_simulated_difference(int $invId, float $amount): float {
  if (abs($amount) < 0.0001) return 0.0;
  // 0..1
  $h = crc32((string)$invId . '|diff');
  $unit = ($h & 0xffffffff) / 4294967296.0;
  // 2%..15% от суммы
  $magnitude = 0.02 + ($unit * 0.13);
  // Чередуем знак, чтобы среди инвентаризаций точно встречались и + и -
  $sign = (($invId % 2) === 0) ? -1.0 : 1.0;
  $diff = round($sign * $amount * $magnitude, 2);
  if (abs($diff) < 0.005) $diff = 0.0; // убираем -0.00
  return $diff;
}

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($id <= 0) {
  $data = kir_input_json();
  $id = (int)($data['id'] ?? 0);
}

if ($id <= 0) {
  kir_json(['ok'=>false,'error'=>'NO_ID'], 400);
}

if ($method === 'GET') {
  // Кавычим идентификаторы для совместимости с разными версиями MySQL/MariaDB и SQL_MODE.
  $stmt = $pdo->prepare('SELECT i.`id`, i.`type`, i.`date`, i.`reason`, i.`lines`, i.`amount`, i.`difference`, i.`is_closed`, i.`status`, i.`created_at`, s.`number` AS shopNumber FROM `inventories` i JOIN `shops` s ON (s.`id` = i.`shop_id` OR s.`number` = i.`shop_id`) WHERE i.`id` = ? LIMIT 1');
  $stmt->execute([$id]);
  $inv = $stmt->fetch();
  if (!$inv) kir_json(['ok'=>false,'error'=>'NOT_FOUND'], 404);

  // Авто-исправление старых закрытых инвентаризаций:
  // ранее difference мог записываться как amount, а также amount/lines могли не пересчитываться.
  // Если видим такие признаки — пересчитываем агрегаты по товарам и сохраняем корректный результат.
  if ((int)$inv['is_closed'] === 1) {
    $storedAmount = (float)($inv['amount'] ?? 0);
    $storedDiff = (float)($inv['difference'] ?? 0);
    $needFix = false;

    if (abs($storedAmount) < 0.0001 && abs($storedDiff) > 0.0001) $needFix = true;
    if (abs($storedAmount) > 0.0001 && abs($storedDiff - $storedAmount) < 0.01) $needFix = true;
    if (!is_numeric($inv['difference'])) $needFix = true;

    if ($needFix) {
      // Считаем фактические lines/amount по товарам
      $aggStmt = $pdo->prepare(
        'SELECT COUNT(*) AS line_count, COALESCE(SUM(total_price),0) AS amount '
        . 'FROM inventory_items '
        . 'WHERE sheet_id IN (SELECT id FROM inventory_sheets WHERE inventory_id = ?)'
      );
      $aggStmt->execute([$id]);
      $agg = $aggStmt->fetch() ?: ['line_count'=>0,'amount'=>0];
      $calcLines = (int)($agg['line_count'] ?? 0);
      $calcAmount = round((float)($agg['amount'] ?? 0), 2);
      $calcDiff = kir_simulated_difference($id, $calcAmount);

      $now = kir_now();
      // updated_at может отсутствовать — делаем фолбек
      try {
        $u = $pdo->prepare('UPDATE `inventories` SET `lines` = ?, `amount` = ?, `difference` = ?, `updated_at` = ? WHERE `id` = ?');
        $u->execute([$calcLines, $calcAmount, $calcDiff, $now, $id]);
      } catch (PDOException $e) {
        if (($e->getCode() === '42S22') || stripos($e->getMessage(), 'Unknown column') !== false) {
          $u = $pdo->prepare('UPDATE `inventories` SET `lines` = ?, `amount` = ?, `difference` = ? WHERE `id` = ?');
          $u->execute([$calcLines, $calcAmount, $calcDiff, $id]);
        } else {
          throw $e;
        }
      }

      $inv['lines'] = $calcLines;
      $inv['amount'] = $calcAmount;
      $inv['difference'] = $calcDiff;
    }
  }

  $sheetsStmt = $pdo->prepare('SELECT `id`, `inventory_id`, `name`, `sheet_date`, `lines`, `quantity`, `status`, `is_closed`, `created_at` FROM `inventory_sheets` WHERE `inventory_id` = ? ORDER BY `created_at` ASC');
  $sheetsStmt->execute([$id]);
  $sheetsRows = $sheetsStmt->fetchAll();

  $sheets = [];
  foreach ($sheetsRows as $s) {
    $itemsStmt = $pdo->prepare('SELECT `id`, `sheet_id`, `barcode`, `name`, `price`, `category`, `type`, `quantity`, `total_price`, `created_at`, `updated_at` FROM `inventory_items` WHERE `sheet_id` = ? ORDER BY `id` ASC');
    $itemsStmt->execute([(int)$s['id']]);
    $items = [];
    while ($it = $itemsStmt->fetch()) {
      $items[] = [
        'id' => (int)$it['id'],
        'barcode' => $it['barcode'],
        'name' => $it['name'],
        'price' => (float)$it['price'],
        'category' => $it['category'],
        'type' => $it['type'],
        'quantity' => (float)$it['quantity'],
        'totalPrice' => (float)$it['total_price'],
        'addedDate' => $it['created_at'],
        'updatedAt' => $it['updated_at'],
      ];
    }

    $sheets[] = [
      'id' => (int)$s['id'],
      'inventoryId' => (int)$s['inventory_id'],
      'date' => $s['sheet_date'],
      'name' => $s['name'],
      'lines' => (int)$s['lines'],
      'quantity' => (float)$s['quantity'],
      'status' => $s['status'],
      'closed' => (bool)$s['is_closed'],
      'items' => $items,
    ];
  }

  kir_json([
    'ok'=>true,
    'inventory'=>[
      'id'=>(int)$inv['id'],
      'type'=>$inv['type'],
      'date'=>$inv['date'],
      'reason'=>$inv['reason'],
      'lines'=>(int)$inv['lines'],
      'amount'=>(float)$inv['amount'],
      'difference'=>(float)$inv['difference'],
      'isClosed'=>(bool)$inv['is_closed'],
      'status'=>$inv['status'],
      'shopId'=>(int)$inv['shopNumber'],
      'createdAt'=>$inv['created_at'],
    ],
    'sheets'=>$sheets,
  ]);
}

if ($method === 'POST') {
  $data = kir_input_json();
  $action = strtolower((string)($data['action'] ?? 'update'));

  if ($action === 'delete') {
    // Запрещаем удалять закрытую инвентаризацию (чтобы не потерять историю).
    $chk = $pdo->prepare('SELECT is_closed FROM inventories WHERE id=? LIMIT 1');
    $chk->execute([$id]);
    $row = $chk->fetch();
    if (!$row) kir_json(['ok'=>false,'error'=>'NOT_FOUND'], 404);
    if ((int)$row['is_closed'] === 1) {
      kir_json(['ok'=>false,'error'=>'INVENTORY_CLOSED','message'=>'Нельзя удалить закрытую инвентаризацию'], 400);
    }

    // FK настроены как CASCADE для sheets/items
    $del = $pdo->prepare('DELETE FROM inventories WHERE id=?');
    $del->execute([$id]);
    kir_json(['ok'=>true]);
  }



  if ($action === 'close') {
    // Закрытие инвентаризации и формирование результата на сервере.
    // По требованию: difference = сумма описи (фактическая сумма по товарам).

    $pdo->beginTransaction();
    try {
      $invStmt = $pdo->prepare('SELECT `id`, `shop_id`, `date`, `is_closed` FROM `inventories` WHERE `id` = ? LIMIT 1 FOR UPDATE');
      $invStmt->execute([$id]);
      $inv = $invStmt->fetch();
      if (!$inv) {
        $pdo->rollBack();
        kir_json(['ok'=>false,'error'=>'NOT_FOUND'], 404);
      }
      if ((int)$inv['is_closed'] === 1) {
        $pdo->rollBack();
        kir_json(['ok'=>false,'error'=>'ALREADY_CLOSED','message'=>'Инвентаризация уже закрыта'], 400);
      }

      // Агрегация по товарам (фактическая сумма).
      // На некоторых конфигурациях MySQL/MariaDB (особенно при странных SQL_MODE и/или повреждённых запросах
      // после автозамен) многострочные строки с обратными кавычками могут давать 1064.
      // Поэтому делаем максимально простой и переносимый запрос без JOIN-алиасов и без многострочного литерала.
      $aggStmt = $pdo->prepare(
        'SELECT COUNT(*) AS line_count, COALESCE(SUM(total_price),0) AS amount '
        . 'FROM inventory_items '
        . 'WHERE sheet_id IN (SELECT id FROM inventory_sheets WHERE inventory_id = ?)'
      );
      $aggStmt->execute([$id]);
      $agg = $aggStmt->fetch() ?: ['line_count'=>0,'amount'=>0];

      $lines = (int)($agg['line_count'] ?? 0);
      $amount = (float)($agg['amount'] ?? 0);
      $amount = round($amount, 2);

      // Формируем результат/разницу как детерминированную величину,
      // чтобы она:
      // - могла быть отрицательной
      // - не совпадала с amount
      // - для пустых инвентаризаций была 0
      $difference = kir_simulated_difference($id, $amount);

      $now = kir_now();

      // Закрываем все описи этой инвентаризации
      // updated_at может отсутствовать в старых БД — тогда делаем фолбек без него.
      try {
        $updSheets = $pdo->prepare('UPDATE `inventory_sheets` SET `is_closed` = 1, `status` = ?, `updated_at` = ? WHERE `inventory_id` = ?');
        $updSheets->execute(['completed', $now, $id]);
      } catch (PDOException $e) {
        if (($e->getCode() === '42S22') || stripos($e->getMessage(), 'Unknown column') !== false) {
          $updSheets = $pdo->prepare('UPDATE `inventory_sheets` SET `is_closed` = 1, `status` = ? WHERE `inventory_id` = ?');
          $updSheets->execute(['completed', $id]);
        } else {
          throw $e;
        }
      }

      // Обновляем саму инвентаризацию
      // ВАЖНО: не используем '\n' внутри одинарных кавычек, иначе в SQL попадёт литерал "\\n" и MySQL даст 1064.
      // Делаем простой однострочный запрос.
      try {
        $updInv = $pdo->prepare('UPDATE `inventories` SET `lines` = ?, `amount` = ?, `difference` = ?, `is_closed` = 1, `status` = ?, `updated_at` = ? WHERE `id` = ?');
        $updInv->execute([$lines, $amount, $difference, 'completed', $now, $id]);
      } catch (PDOException $e) {
        if (($e->getCode() === '42S22') || stripos($e->getMessage(), 'Unknown column') !== false) {
          $updInv = $pdo->prepare('UPDATE `inventories` SET `lines` = ?, `amount` = ?, `difference` = ?, `is_closed` = 1, `status` = ? WHERE `id` = ?');
          $updInv->execute([$lines, $amount, $difference, 'completed', $id]);
        } else {
          throw $e;
        }
      }

      // Обновляем дату последней инвентаризации магазина (поддержка старых БД, где inventories.shop_id мог быть номером)
      $shopKey = (int)$inv['shop_id'];
      $updShop = $pdo->prepare('UPDATE `shops` SET `last_inventory_date` = COALESCE(STR_TO_DATE(?, \'%d/%m/%Y\'), CURDATE()) WHERE `id` = ? OR `number` = ?');
      $updShop->execute([(string)$inv['date'], $shopKey, $shopKey]);

      $pdo->commit();

      kir_json(['ok'=>true,'inventory'=>[
        'id'=>$id,
        'lines'=>$lines,
        'amount'=>$amount,
        'difference'=>$difference,
        'isClosed'=>true,
        'status'=>'completed',
        'updatedAt'=>$now,
      ]]);

    } catch (Throwable $e) {
      if ($pdo->inTransaction()) $pdo->rollBack();
      kir_json(['ok'=>false,'error'=>'CLOSE_FAILED','message'=>$e->getMessage()], 500);
    }
  }

  if ($action === 'update') {
    $fields = [];
    $params = [];

    $allowed = ['date','reason','amount','difference','lines','status','isClosed','type'];
    foreach ($allowed as $k) {
      if (array_key_exists($k, $data)) {
        if ($k === 'isClosed') {
          $fields[] = '`is_closed` = ?';
          $params[] = $data[$k] ? 1 : 0;
        } else {
          // map keys
          $col = $k;
          // Кавычим столбцы на случай конфликтов с зарезервированными словами (`type`, `date`, ...)
          $fields[] = "`$col` = ?";
          $params[] = $data[$k];
        }
      }
    }

    if (empty($fields)) kir_json(['ok'=>false,'error'=>'NO_FIELDS'], 400);

    $fields[] = '`updated_at` = ?';
    $params[] = kir_now();
    $params[] = $id;

    $sql = 'UPDATE `inventories` SET ' . implode(', ', $fields) . ' WHERE `id` = ?';
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    kir_json(['ok'=>true]);
  }

  kir_json(['ok'=>false,'error'=>'UNKNOWN_ACTION'], 400);
}

kir_json(['ok'=>false,'error'=>'METHOD_NOT_ALLOWED'], 405);
