<?php
require __DIR__ . '/db.php';
kir_require_login();

$pdo = kir_db();
$method = $_SERVER['REQUEST_METHOD'];

// См. api/inventory.php: модель результата/разницы без учетной базы.
function kir_simulated_difference(int $invId, float $amount): float {
  if (abs($amount) < 0.0001) return 0.0;
  $h = crc32((string)$invId . '|diff');
  $unit = ($h & 0xffffffff) / 4294967296.0;
  $magnitude = 0.02 + ($unit * 0.13); // 2%..15%
  $sign = (($invId % 2) === 0) ? -1.0 : 1.0;
  $diff = round($sign * $amount * $magnitude, 2);
  if (abs($diff) < 0.005) $diff = 0.0;
  return $diff;
}

// Совместимость со старой БД: в некоторых версиях inventories.shop_id = shops.number,
// в новых — inventories.shop_id = shops.id (FK). Определяем по наличию FK.
function kir_inventories_shop_uses_db_id(PDO $pdo): bool {
  static $cache = null;
  if ($cache !== null) return $cache;
  $q = "SELECT COUNT(*) FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
        WHERE TABLE_SCHEMA = DATABASE()
          AND TABLE_NAME = 'inventories'
          AND COLUMN_NAME = 'shop_id'
          AND REFERENCED_TABLE_NAME = 'shops'";
  $cache = ((int)$pdo->query($q)->fetchColumn()) > 0;
  return $cache;
}

if ($method === 'GET') {
  $shopNumber = isset($_GET['shop_id']) ? (int)$_GET['shop_id'] : 0;

  $join = '';
  $where = '';
  $params = [];

  // Если выбран магазин — фильтруем по shops.number, но связываем i.shop_id и с shops.id, и с shops.number
  if ($shopNumber > 0) {
    $join = 'JOIN `shops` sh ON (sh.`id` = i.`shop_id` OR sh.`number` = i.`shop_id`)';
    $where = 'WHERE sh.`number` = ?';
    $params[] = $shopNumber;
  }

  // Кавычим идентификаторы для совместимости с разными версиями MySQL/MariaDB и SQL_MODE.
  $sql = "SELECT i.`id`, i.`type`, i.`date`, i.`reason`, i.`lines`, i.`amount`, i.`difference`, i.`is_closed`, i.`status`, i.`created_at`,
                 (SELECT COUNT(*) FROM `inventory_sheets` s WHERE s.`inventory_id` = i.`id`) AS sheets_count,
                 (SELECT COUNT(*)
                    FROM `inventory_items` it
                    JOIN `inventory_sheets` s2 ON s2.`id` = it.`sheet_id`
                   WHERE s2.`inventory_id` = i.`id`) AS items_count
          FROM `inventories` i $join $where
          ORDER BY i.`created_at` DESC";

  $stmt = $pdo->prepare($sql);
  $stmt->execute($params);
  $rows = $stmt->fetchAll();

  $inventories = [];
  foreach ($rows as $r) {
    $status = $r['status'];
    if (($status === null || $status === '') && (int)$r['is_closed'] === 1) {
      $status = 'completed';
    }
    $idRow = (int)$r['id'];
    $lines = (int)$r['lines'];
    $amount = round((float)($r['amount'] ?? 0), 2);
    $difference = (float)($r['difference'] ?? 0);

    // Авто-исправление старых данных: ранее difference мог совпадать с amount,
    // а amount/lines могли быть не пересчитаны при закрытии.
    if ((int)$r['is_closed'] === 1) {
      $needFix = false;
      if (abs($amount) < 0.0001 && (int)($r['items_count'] ?? 0) > 0) $needFix = true;
      if (abs($amount) < 0.0001 && abs($difference) > 0.0001) $needFix = true;
      if (abs($amount) > 0.0001 && abs($difference - $amount) < 0.01) $needFix = true;
      if (!is_numeric($r['difference'])) $needFix = true;

      if ($needFix) {
        $aggStmt = $pdo->prepare(
          'SELECT COUNT(*) AS line_count, COALESCE(SUM(total_price),0) AS amount '
          . 'FROM inventory_items '
          . 'WHERE sheet_id IN (SELECT id FROM inventory_sheets WHERE inventory_id = ?)' 
        );
        $aggStmt->execute([$idRow]);
        $agg = $aggStmt->fetch() ?: ['line_count'=>0,'amount'=>0];
        $lines = (int)($agg['line_count'] ?? 0);
        $amount = round((float)($agg['amount'] ?? 0), 2);
        $difference = kir_simulated_difference($idRow, $amount);

        $now = kir_now();
        try {
          $u = $pdo->prepare('UPDATE `inventories` SET `lines` = ?, `amount` = ?, `difference` = ?, `updated_at` = ? WHERE `id` = ?');
          $u->execute([$lines, $amount, $difference, $now, $idRow]);
        } catch (PDOException $e) {
          if (($e->getCode() === '42S22') || stripos($e->getMessage(), 'Unknown column') !== false) {
            $u = $pdo->prepare('UPDATE `inventories` SET `lines` = ?, `amount` = ?, `difference` = ? WHERE `id` = ?');
            $u->execute([$lines, $amount, $difference, $idRow]);
          } else {
            throw $e;
          }
        }
      }
    }

    $inventories[] = [
      'id' => $idRow,
      'type' => $r['type'],
      'date' => $r['date'],
      'reason' => $r['reason'],
      'lines' => $lines,
      'amount' => $amount,
      'difference' => $difference,
      'isClosed' => (bool)$r['is_closed'],
      'status' => $status,
      'sheetsCount' => (int)$r['sheets_count'],
      'itemsCount' => (int)$r['items_count'],
      'createdAt' => $r['created_at'],
    ];
  }

  kir_json(['ok'=>true,'inventories'=>$inventories]);
}

if ($method === 'POST') {
  $data = kir_input_json();
  $shopNumber = (int)($data['shopId'] ?? 0);
  $type = strtolower(trim((string)($data['type'] ?? '')));
  $date = trim((string)($data['date'] ?? ''));
  $reason = trim((string)($data['reason'] ?? ''));

  if ($shopNumber <= 0 || $type === '' || $date === '' || $reason === '') {
    kir_json(['ok'=>false,'error'=>'VALIDATION'], 400);
  }

  $sstmt = $pdo->prepare('SELECT id, number FROM shops WHERE number = ? LIMIT 1');
  $sstmt->execute([$shopNumber]);
  $s = $sstmt->fetch();
  if (!$s) kir_json(['ok'=>false,'error'=>'SHOP_NOT_FOUND'], 400);

  $shopIdToStore = kir_inventories_shop_uses_db_id($pdo) ? (int)$s['id'] : (int)$s['number'];

  // Кавычим имена столбцов, чтобы избежать конфликтов с зарезервированными словами (например, `type`, `date`).
  $stmt = $pdo->prepare('INSERT INTO `inventories` (`shop_id`, `type`, `date`, `reason`, `lines`, `amount`, `difference`, `is_closed`, `status`, `created_by`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
  $now = kir_now();
  $stmt->execute([
    $shopIdToStore,
    $type,
    $date,
    $reason,
    0,
    0,
    0,
    0,
    'active',
    (int)$_SESSION['user_id'],
    $now,
    $now,
  ]);

  $id = (int)$pdo->lastInsertId();
  kir_json(['ok'=>true,'inventory'=>[
    'id'=>$id,
    'type'=>$type,
    'date'=>$date,
    'reason'=>$reason,
    'lines'=>0,
    'amount'=>0,
    'difference'=>0,
    'isClosed'=>false,
    'status'=>'active',
    'shopId'=>$shopNumber,
    'createdAt'=>$now
  ]]);
}

kir_json(['ok'=>false,'error'=>'METHOD_NOT_ALLOWED'], 405);
