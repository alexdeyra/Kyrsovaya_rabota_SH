<?php
require __DIR__ . '/db.php';
kir_start_session();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  kir_json(['ok'=>false,'error'=>'METHOD_NOT_ALLOWED'], 405);
}

$data = kir_input_json();
$username = trim((string)($data['username'] ?? ''));
$password = (string)($data['password'] ?? '');

if ($username === '' || $password === '') {
  kir_json(['ok'=>false,'error'=>'EMPTY_CREDENTIALS'], 400);
}

$pdo = kir_db();
$stmt = $pdo->prepare('SELECT id, username, password_hash, full_name, role FROM users WHERE username = ? LIMIT 1');
$stmt->execute([$username]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
  kir_json(['ok'=>false,'error'=>'INVALID_CREDENTIALS'], 401);
}

$_SESSION['user_id'] = (int)$user['id'];
$_SESSION['username'] = $user['username'];
$_SESSION['role'] = $user['role'];

kir_json([
  'ok'=>true,
  'user'=>[
    'id'=>(int)$user['id'],
    'login'=>$user['username'],
    'name'=>$user['full_name'] ?: $user['username'],
    'role'=>$user['role'],
  ]
]);
