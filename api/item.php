<?php
require __DIR__ . '/db.php';
kir_require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  kir_json(['ok'=>false,'error'=>'METHOD_NOT_ALLOWED'], 405);
}

$pdo = kir_db();
$data = kir_input_json();
$action = strtolower((string)($data['action'] ?? ''));
$itemId = (int)($data['id'] ?? 0);

if ($itemId <= 0) kir_json(['ok'=>false,'error'=>'NO_ID'], 400);

$itemStmt = $pdo->prepare('SELECT it.`id`, it.`sheet_id`, it.`barcode`, it.`quantity`, s.`inventory_id`, i.`type` AS inventory_type, i.`is_closed` FROM `inventory_items` it JOIN `inventory_sheets` s ON s.`id` = it.`sheet_id` JOIN `inventories` i ON i.`id` = s.`inventory_id` WHERE it.`id` = ? LIMIT 1');
$itemStmt->execute([$itemId]);
$it = $itemStmt->fetch();
if (!$it) kir_json(['ok'=>false,'error'=>'NOT_FOUND'], 404);
if ((int)$it['is_closed'] === 1) kir_json(['ok'=>false,'error'=>'INVENTORY_CLOSED'], 400);

$now = kir_now();

if ($action === 'delete') {
  $del = $pdo->prepare('DELETE FROM `inventory_items` WHERE `id` = ?');
  $del->execute([$itemId]);

  // пересчёт sheet/inventory
  $sheetId = (int)$it['sheet_id'];
  $sumStmt = $pdo->prepare('SELECT COUNT(*) AS line_count, COALESCE(SUM(`quantity`),0) AS qty FROM `inventory_items` WHERE `sheet_id` = ?');
  $sumStmt->execute([$sheetId]);
  $agg = $sumStmt->fetch();
  $updSheet = $pdo->prepare('UPDATE `inventory_sheets` SET `lines` = ?, `quantity` = ?, `updated_at` = ? WHERE `id` = ?');
  $updSheet->execute([(int)$agg['line_count'], (float)$agg['qty'], $now, $sheetId]);

  $invId = (int)$it['inventory_id'];
  $invAggStmt = $pdo->prepare('SELECT COUNT(*) AS line_count, COALESCE(SUM(it.`total_price`),0) AS amount FROM `inventory_items` it JOIN `inventory_sheets` s ON s.`id` = it.`sheet_id` WHERE s.`inventory_id` = ?');
  $invAggStmt->execute([$invId]);
  $invAgg = $invAggStmt->fetch();
  $updInv = $pdo->prepare('UPDATE `inventories` SET `lines` = ?, `amount` = ?, `updated_at` = ? WHERE `id` = ?');
  $updInv->execute([(int)$invAgg['line_count'], (float)$invAgg['amount'], $now, $invId]);

  kir_json(['ok'=>true]);
}

if ($action === 'update') {
  $barcode = trim((string)($data['barcode'] ?? $it['barcode']));
  $barcode = preg_replace('/\D+/', '', $barcode);
  $quantity = isset($data['quantity']) ? (float)$data['quantity'] : (float)$it['quantity'];

  if ($barcode === '' || $quantity <= 0) kir_json(['ok'=>false,'error'=>'VALIDATION'], 400);
  if (!preg_match('/^\d{13}$/', $barcode)) kir_json(['ok'=>false,'error'=>'BARCODE_13','message'=>'Штрихкод должен содержать ровно 13 цифр'], 400);
  if ($quantity > 1000) kir_json(['ok'=>false,'error'=>'QTY_LIMIT'], 400);

  // Получаем товар
  $prodStmt = $pdo->prepare('SELECT id, barcode, name, price, category, type FROM products WHERE barcode = ? LIMIT 1');
  $prodStmt->execute([$barcode]);
  $p = $prodStmt->fetch();
  if (!$p) {
    $rp = kir_random_product($barcode, $it['inventory_type']);
    $ins = $pdo->prepare('INSERT INTO `products` (`barcode`, `name`, `price`, `category`, `type`, `is_random`, `created_at`) VALUES (?,?,?,?,?,?,?)');
    $ins->execute([$barcode, $rp['name'], $rp['price'], $rp['category'], $rp['type'], 1, $now]);
    $p = [
      'id' => (int)$pdo->lastInsertId(),
      'barcode' => $barcode,
      'name' => $rp['name'],
      'price' => $rp['price'],
      'category' => $rp['category'],
      'type' => $rp['type'],
    ];
  }

  if (!kir_inventory_type_allows_product($it['inventory_type'], $p['type'])) {
    kir_json(['ok'=>false,'error'=>'TYPE_MISMATCH','message'=>'Этот товар не подходит для данной инвентаризации'], 400);
  }

  // если меняем штрихкод на уже существующий в этом sheet — объединяем
  $sheetId = (int)$it['sheet_id'];
  $existingStmt = $pdo->prepare('SELECT `id`, `quantity` FROM `inventory_items` WHERE `sheet_id` = ? AND `barcode` = ? AND `id` <> ? LIMIT 1');
  $existingStmt->execute([$sheetId, $barcode, $itemId]);
  $ex = $existingStmt->fetch();

  $price = (float)$p['price'];

  if ($ex) {
    $mergedQty = (float)$ex['quantity'] + $quantity;
    if ($mergedQty > 1000) kir_json(['ok'=>false,'error'=>'QTY_LIMIT'], 400);
    $mergedTotal = round($mergedQty * $price, 2);

    // обновляем существующую строку
    $upd = $pdo->prepare('UPDATE `inventory_items` SET `product_id`=?, `name`=?, `price`=?, `category`=?, `type`=?, `quantity`=?, `total_price`=?, `updated_at`=? WHERE `id`=?');
    $upd->execute([(int)$p['id'], $p['name'], $price, $p['category'], $p['type'], $mergedQty, $mergedTotal, $now, (int)$ex['id']]);
    // удаляем старую
    $del = $pdo->prepare('DELETE FROM `inventory_items` WHERE `id` = ?');
    $del->execute([$itemId]);
  } else {
    $total = round($quantity * $price, 2);
    $upd = $pdo->prepare('UPDATE `inventory_items` SET `product_id`=?, `barcode`=?, `name`=?, `price`=?, `category`=?, `type`=?, `quantity`=?, `total_price`=?, `updated_at`=? WHERE `id`=?');
    $upd->execute([(int)$p['id'], $barcode, $p['name'], $price, $p['category'], $p['type'], $quantity, $total, $now, $itemId]);
  }

  // пересчёт sheet/inventory
  $sumStmt = $pdo->prepare('SELECT COUNT(*) AS line_count, COALESCE(SUM(`quantity`),0) AS qty FROM `inventory_items` WHERE `sheet_id` = ?');
  $sumStmt->execute([$sheetId]);
  $agg = $sumStmt->fetch();
  $updSheet = $pdo->prepare('UPDATE `inventory_sheets` SET `lines` = ?, `quantity` = ?, `updated_at` = ? WHERE `id` = ?');
  $updSheet->execute([(int)$agg['line_count'], (float)$agg['qty'], $now, $sheetId]);

  $invId = (int)$it['inventory_id'];
  $invAggStmt = $pdo->prepare('SELECT COUNT(*) AS line_count, COALESCE(SUM(it.`total_price`),0) AS amount FROM `inventory_items` it JOIN `inventory_sheets` s ON s.`id` = it.`sheet_id` WHERE s.`inventory_id` = ?');
  $invAggStmt->execute([$invId]);
  $invAgg = $invAggStmt->fetch();
  $updInv = $pdo->prepare('UPDATE `inventories` SET `lines` = ?, `amount` = ?, `updated_at` = ? WHERE `id` = ?');
  $updInv->execute([(int)$invAgg['line_count'], (float)$invAgg['amount'], $now, $invId]);

  kir_json(['ok'=>true]);
}

kir_json(['ok'=>false,'error'=>'UNKNOWN_ACTION'], 400);
