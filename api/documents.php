<?php
require __DIR__ . '/db.php';
kir_require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
  kir_json(['ok'=>false,'error'=>'METHOD_NOT_ALLOWED'], 405);
}

$shopNumber = isset($_GET['shop_id']) ? (int)$_GET['shop_id'] : 0; // номер магазина
$start = trim((string)($_GET['start'] ?? '')); // YYYY-MM-DD
$end   = trim((string)($_GET['end'] ?? ''));   // YYYY-MM-DD

if ($shopNumber <= 0) {
  kir_json(['ok'=>false,'error'=>'NO_SHOP_ID'], 400);
}

$pdo = kir_db();

// map shop number -> internal id
$sstmt = $pdo->prepare('SELECT id, number FROM shops WHERE number = ? LIMIT 1');
$sstmt->execute([$shopNumber]);
$shop = $sstmt->fetch();
if (!$shop) {
  kir_json(['ok'=>true,'documents'=>[]]);
}

$where = 'WHERE d.shop_id = ?';
$params = [(int)$shop['id']];

// Документ хранит дату строкой dd/mm/YYYY. Для фильтра используем STR_TO_DATE.
if ($start !== '' && $end !== '') {
  $where .= " AND STR_TO_DATE(d.doc_date, '%d/%m/%Y') BETWEEN ? AND ?";
  $params[] = $start;
  $params[] = $end;
} elseif ($start !== '') {
  $where .= " AND STR_TO_DATE(d.doc_date, '%d/%m/%Y') >= ?";
  $params[] = $start;
} elseif ($end !== '') {
  $where .= " AND STR_TO_DATE(d.doc_date, '%d/%m/%Y') <= ?";
  $params[] = $end;
}

$sql = "SELECT d.id, d.doc_type, d.doc_number, d.doc_date, d.amount, d.status, d.created_at
        FROM documents d
        $where
        ORDER BY STR_TO_DATE(d.doc_date, '%d/%m/%Y') DESC, d.created_at DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);

$docs = [];
while ($r = $stmt->fetch()) {
  $docs[] = [
    'id' => (int)$r['id'],
    'type' => $r['doc_type'],
    'number' => $r['doc_number'],
    'date' => $r['doc_date'],
    'amount' => (float)$r['amount'],
    'status' => $r['status'],
    'shopId' => (int)$shopNumber,
    'createdAt' => $r['created_at'],
  ];
}

kir_json(['ok'=>true,'documents'=>$docs]);
