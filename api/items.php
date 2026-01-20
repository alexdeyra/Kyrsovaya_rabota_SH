<?php
require __DIR__ . '/db.php';
kir_require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  kir_json(['ok'=>false,'error'=>'METHOD_NOT_ALLOWED'], 405);
}

$pdo = kir_db();
$data = kir_input_json();
$sheetId = (int)($data['sheetId'] ?? 0);
$barcode = trim((string)($data['barcode'] ?? ''));
$quantity = (float)($data['quantity'] ?? 0);

if ($sheetId <= 0 || $barcode === '' || $quantity <= 0) {
  kir_json(['ok'=>false,'error'=>'VALIDATION'], 400);
}

// enforce EAN-13 length (13 digits)
$barcode = preg_replace('/\D+/', '', $barcode);
if (!preg_match('/^\d{13}$/', $barcode)) {
  kir_json(['ok'=>false,'error'=>'BARCODE_13','message'=>'Штрихкод должен содержать ровно 13 цифр'], 400);
}

if ($quantity > 1000) {
  kir_json(['ok'=>false,'error'=>'QTY_LIMIT','message'=>'Нельзя добавить больше 1000 шт одного вида товара.'], 400);
}

// Получаем тип инвентаризации и состояние
$invStmt = $pdo->prepare('SELECT i.`id`, i.`type`, i.`is_closed` FROM `inventories` i JOIN `inventory_sheets` s ON s.`inventory_id` = i.`id` WHERE s.`id` = ? LIMIT 1');
$invStmt->execute([$sheetId]);
$inv = $invStmt->fetch();
if (!$inv) kir_json(['ok'=>false,'error'=>'SHEET_NOT_FOUND'], 404);
if ((int)$inv['is_closed'] === 1) kir_json(['ok'=>false,'error'=>'INVENTORY_CLOSED'], 400);
$inventoryType = $inv['type'];

// Ищем товар
$prodStmt = $pdo->prepare('SELECT `id`, `barcode`, `name`, `price`, `category`, `type` FROM `products` WHERE `barcode` = ? LIMIT 1');
$prodStmt->execute([$barcode]);
$p = $prodStmt->fetch();

if (!$p) {
  $rp = kir_random_product($barcode, $inventoryType);
  if (!kir_inventory_type_allows_product($inventoryType, $rp['type'])) {
    kir_json(['ok'=>false,'error'=>'TYPE_MISMATCH','message'=>'Этот товар не подходит для данной инвентаризации'], 400);
  }
  $ins = $pdo->prepare('INSERT INTO `products` (`barcode`, `name`, `price`, `category`, `type`, `is_random`, `created_at`) VALUES (?,?,?,?,?,?,?)');
  $ins->execute([$barcode, $rp['name'], $rp['price'], $rp['category'], $rp['type'], 1, kir_now()]);
  $p = [
    'id' => (int)$pdo->lastInsertId(),
    'barcode' => $barcode,
    'name' => $rp['name'],
    'price' => $rp['price'],
    'category' => $rp['category'],
    'type' => $rp['type'],
  ];
} else {
  if (!kir_inventory_type_allows_product($inventoryType, $p['type'])) {
    kir_json(['ok'=>false,'error'=>'TYPE_MISMATCH','message'=>'Этот товар не подходит для данной инвентаризации'], 400);
  }
}

$price = (float)$p['price'];
$total = round($price * $quantity, 2);
$now = kir_now();

// Upsert по (sheet_id, barcode)
$existingStmt = $pdo->prepare('SELECT `id`, `quantity`, `price` FROM `inventory_items` WHERE `sheet_id` = ? AND `barcode` = ? LIMIT 1');
$existingStmt->execute([$sheetId, $barcode]);
$ex = $existingStmt->fetch();

if ($ex) {
  $newQty = (float)$ex['quantity'] + $quantity;
  if ($newQty > 1000) {
    kir_json(['ok'=>false,'error'=>'QTY_LIMIT','message'=>'Нельзя сделать количество больше 1000 шт для одного товара.'], 400);
  }
  $newTotal = round($newQty * $price, 2);
  $upd = $pdo->prepare('UPDATE `inventory_items` SET `name` = ?, `price` = ?, `category` = ?, `type` = ?, `quantity` = ?, `total_price` = ?, `updated_at` = ? WHERE `id` = ?');
  $upd->execute([$p['name'], $price, $p['category'], $p['type'], $newQty, $newTotal, $now, (int)$ex['id']]);
  $itemId = (int)$ex['id'];
} else {
  $ins = $pdo->prepare('INSERT INTO `inventory_items` (`sheet_id`, `product_id`, `barcode`, `name`, `price`, `category`, `type`, `quantity`, `total_price`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?)');
  $ins->execute([$sheetId, (int)$p['id'], $barcode, $p['name'], $price, $p['category'], $p['type'], $quantity, $total, $now, $now]);
  $itemId = (int)$pdo->lastInsertId();
}

// Пересчёт sheet stats
$sumStmt = $pdo->prepare('SELECT COUNT(*) AS line_count, COALESCE(SUM(`quantity`),0) AS qty FROM `inventory_items` WHERE `sheet_id` = ?');
$sumStmt->execute([$sheetId]);
$agg = $sumStmt->fetch();

$updSheet = $pdo->prepare('UPDATE `inventory_sheets` SET `lines` = ?, `quantity` = ?, `updated_at` = ? WHERE `id` = ?');
$updSheet->execute([(int)$agg['line_count'], (float)$agg['qty'], $now, $sheetId]);

// Пересчёт inventory lines/amount (amount = сумма фактическая по товарам)
$invAggStmt = $pdo->prepare('SELECT COUNT(*) AS line_count, COALESCE(SUM(it.`total_price`),0) AS amount FROM `inventory_items` it JOIN `inventory_sheets` s ON s.`id` = it.`sheet_id` WHERE s.`inventory_id` = ?');
$invAggStmt->execute([(int)$inv['id']]);
$invAgg = $invAggStmt->fetch();
$updInv = $pdo->prepare('UPDATE `inventories` SET `lines` = ?, `amount` = ?, `updated_at` = ? WHERE `id` = ?');
$updInv->execute([(int)$invAgg['line_count'], (float)$invAgg['amount'], $now, (int)$inv['id']]);

kir_json(['ok'=>true,'itemId'=>$itemId]);
