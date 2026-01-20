<?php
require __DIR__ . '/db.php';
kir_require_login();

$barcode = trim((string)($_GET['barcode'] ?? ''));
$barcode = preg_replace('/\D+/', '', $barcode);
$inventoryType = strtolower(trim((string)($_GET['inventoryType'] ?? 'general')));

if ($barcode === '') {
  kir_json(['ok'=>false,'error'=>'NO_BARCODE'], 400);
}
if (!preg_match('/^\d{13}$/', $barcode)) {
  kir_json(['ok'=>false,'error'=>'BARCODE_13','message'=>'Штрихкод должен содержать ровно 13 цифр'], 400);
}

$pdo = kir_db();
$stmt = $pdo->prepare('SELECT id, barcode, name, price, category, type, is_random FROM products WHERE barcode = ? LIMIT 1');
$stmt->execute([$barcode]);
$p = $stmt->fetch();

if ($p) {
  // AUTO_UPGRADE_RANDOM_GENERAL: заменяем старые шаблонные случайные товары на более реалистичные
  if ((int)($p['is_random'] ?? 0) === 1) {
    $pType = strtolower((string)($p['type'] ?? 'general'));
    $placeholders = ['Продукт питания 1кг', 'Товар хозяйственный', 'Кондитерское изделие', 'Напиток 1л'];
    if ($pType === 'general' && in_array((string)$p['name'], $placeholders, true)) {
      $rp = kir_random_product((string)$p['barcode'], 'general');
      $upd = $pdo->prepare('UPDATE products SET name = ?, price = ?, category = ?, type = ? WHERE id = ?');
      $upd->execute([$rp['name'], $rp['price'], $rp['category'], $rp['type'], (int)$p['id']]);
      $p['name'] = $rp['name'];
      $p['price'] = $rp['price'];
      $p['category'] = $rp['category'];
      $p['type'] = $rp['type'];
    }
  }
  $valid = kir_inventory_type_allows_product($inventoryType, $p['type']);
  if (!$valid) {
    kir_json(['ok'=>true,'foundInDb'=>true,'isValidForInventory'=>false,'errorMessage'=>'Этот товар не подходит для данной инвентаризации']);
  }
  kir_json([
    'ok'=>true,
    'foundInDb'=>true,
    'isRandom'=>(bool)$p['is_random'],
    'isValidForInventory'=>true,
    'product'=>[
      'id'=>(int)$p['id'],
      'barcode'=>$p['barcode'],
      'name'=>$p['name'],
      'price'=>(float)$p['price'],
      'category'=>$p['category'],
      'type'=>$p['type'],
    ]
  ]);
}

// нет в базе — генерируем по типу, сохраняем как is_random
$rp = kir_random_product($barcode, $inventoryType);
$valid = kir_inventory_type_allows_product($inventoryType, $rp['type']);
if (!$valid) {
  kir_json(['ok'=>true,'foundInDb'=>false,'isValidForInventory'=>false,'errorMessage'=>'Этот товар не подходит для данной инвентаризации']);
}

$ins = $pdo->prepare('INSERT INTO products (barcode, name, price, category, type, is_random, created_at) VALUES (?,?,?,?,?,?,?)');
$ins->execute([$barcode, $rp['name'], $rp['price'], $rp['category'], $rp['type'], 1, kir_now()]);
$id = (int)$pdo->lastInsertId();

kir_json([
  'ok'=>true,
  'foundInDb'=>false,
  'isRandom'=>true,
  'isValidForInventory'=>true,
  'product'=>[
    'id'=>$id,
    'barcode'=>$barcode,
    'name'=>$rp['name'],
    'price'=>(float)$rp['price'],
    'category'=>$rp['category'],
    'type'=>$rp['type'],
  ]
]);
