<?php
require __DIR__ . '/db.php';
kir_require_login();

$pdo = kir_db();
$stmt = $pdo->query('SELECT id, number, name, location, status, last_inventory_date FROM shops ORDER BY number');
$shops = [];
while ($r = $stmt->fetch()) {
  $last = null;
  if (!empty($r['last_inventory_date'])) {
    $dt = new DateTime($r['last_inventory_date']);
    $last = $dt->format('d/m/Y');
  }

  $shops[] = [
    'id' => (int)$r['number'],
    'db_id' => (int)$r['id'],
    'name' => $r['name'],
    'location' => $r['location'],
    'status' => $r['status'],
    'lastInventory' => $last,
  ];
}

kir_json(['ok'=>true,'shops'=>$shops]);
