<?php
require __DIR__ . '/db.php';
kir_require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
  kir_json(['ok'=>false,'error'=>'METHOD_NOT_ALLOWED'], 405);
}

$shopNumber = isset($_GET['shop_id']) ? (int)$_GET['shop_id'] : 0; // номер магазина
if ($shopNumber <= 0) {
  kir_json(['ok'=>false,'error'=>'NO_SHOP_ID'], 400);
}

$pdo = kir_db();

// map shop number -> internal id
$sstmt = $pdo->prepare('SELECT id FROM shops WHERE number = ? LIMIT 1');
$sstmt->execute([$shopNumber]);
$shop = $sstmt->fetch();
if (!$shop) {
  kir_json(['ok'=>true,'history'=>[]]);
}

// История = закрытые инвентаризации
$sql = "SELECT i.id, i.type, i.date, i.reason, i.amount, i.difference, i.status, i.is_closed, i.created_at,
               u.username, u.full_name
        FROM inventories i
        LEFT JOIN users u ON u.id = i.created_by
        WHERE i.shop_id = ? AND (i.is_closed = 1 OR i.status = 'completed')
        ORDER BY STR_TO_DATE(i.date, '%d/%m/%Y') DESC, i.created_at DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute([(int)$shop['id']]);

$rows = [];
while ($r = $stmt->fetch()) {
  $responsible = '';
  if (!empty($r['full_name'])) $responsible = $r['full_name'];
  elseif (!empty($r['username'])) $responsible = $r['username'];

  $rows[] = [
    'id' => (int)$r['id'],
    'date' => $r['date'],
    'type' => $r['type'],
    'name' => $r['reason'],
    'amount' => (float)$r['amount'],
    'difference' => (float)$r['difference'],
    'status' => 'completed',
    'responsible' => $responsible,
    'shopId' => (int)$shopNumber,
    'createdAt' => $r['created_at'],
  ];
}

kir_json(['ok'=>true,'history'=>$rows]);
