<?php
require __DIR__ . '/db.php';
kir_require_login();

$pdo = kir_db();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  $invId = (int)($_GET['inventory_id'] ?? 0);
  if ($invId <= 0) kir_json(['ok'=>false,'error'=>'NO_INVENTORY_ID'], 400);

  // Кавычим идентификаторы для совместимости с разными версиями MySQL/MariaDB и SQL_MODE.
  $stmt = $pdo->prepare('SELECT `id`, `inventory_id`, `name`, `sheet_date`, `lines`, `quantity`, `status`, `is_closed`, `created_at` FROM `inventory_sheets` WHERE `inventory_id` = ? ORDER BY `created_at` ASC');
  $stmt->execute([$invId]);
  $sheets = [];
  while ($s = $stmt->fetch()) {
    $sheets[] = [
      'id'=>(int)$s['id'],
      'inventoryId'=>(int)$s['inventory_id'],
      'name'=>$s['name'],
      'date'=>$s['sheet_date'],
      'lines'=>(int)$s['lines'],
      'quantity'=>(float)$s['quantity'],
      'status'=>$s['status'],
      'closed'=>(bool)$s['is_closed'],
      'createdAt'=>$s['created_at'],
    ];
  }
  kir_json(['ok'=>true,'sheets'=>$sheets]);
}

if ($method === 'POST') {
  $data = kir_input_json();
  $invId = (int)($data['inventoryId'] ?? 0);
  $name = trim((string)($data['name'] ?? ''));
  $date = trim((string)($data['date'] ?? ''));

  if ($invId <= 0 || $name === '' || $date === '') {
    kir_json(['ok'=>false,'error'=>'VALIDATION'], 400);
  }

  // Проверяем, что инвентаризация не закрыта
  $invStmt = $pdo->prepare('SELECT is_closed FROM inventories WHERE id = ? LIMIT 1');
  $invStmt->execute([$invId]);
  $inv = $invStmt->fetch();
  if (!$inv) kir_json(['ok'=>false,'error'=>'INVENTORY_NOT_FOUND'], 404);
  if ((int)$inv['is_closed'] === 1) kir_json(['ok'=>false,'error'=>'INVENTORY_CLOSED'], 400);

  $now = kir_now();
  $stmt = $pdo->prepare('INSERT INTO `inventory_sheets` (`inventory_id`, `name`, `sheet_date`, `lines`, `quantity`, `status`, `is_closed`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?)');
  $stmt->execute([$invId, $name, $date, 0, 0, 'pending', 0, $now, $now]);
  $id = (int)$pdo->lastInsertId();

  kir_json(['ok'=>true,'sheet'=>[
    'id'=>$id,
    'inventoryId'=>$invId,
    'name'=>$name,
    'date'=>$date,
    'lines'=>0,
    'quantity'=>0,
    'status'=>'pending',
    'closed'=>false,
  ]]);
}

kir_json(['ok'=>false,'error'=>'METHOD_NOT_ALLOWED'], 405);
