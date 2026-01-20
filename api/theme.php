<?php
require __DIR__ . '/db.php';
kir_require_login();

$pdo = kir_db();
$method = $_SERVER['REQUEST_METHOD'];
$userId = (int)$_SESSION['user_id'];

if ($method === 'GET') {
  $stmt = $pdo->prepare('SELECT theme FROM users WHERE id=?');
  $stmt->execute([$userId]);
  $r = $stmt->fetch();
  kir_json(['ok'=>true,'theme'=>$r ? $r['theme'] : null]);
}

if ($method === 'POST') {
  $data = kir_input_json();
  $theme = strtolower(trim((string)($data['theme'] ?? '')));
  if ($theme !== 'light' && $theme !== 'dark') kir_json(['ok'=>false,'error'=>'VALIDATION'], 400);
  $stmt = $pdo->prepare('UPDATE users SET theme=? WHERE id=?');
  $stmt->execute([$theme, $userId]);
  kir_json(['ok'=>true]);
}

kir_json(['ok'=>false,'error'=>'METHOD_NOT_ALLOWED'], 405);
