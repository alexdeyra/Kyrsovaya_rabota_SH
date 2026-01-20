<?php
require __DIR__ . '/db.php';
kir_start_session();

if (empty($_SESSION['user_id'])) {
  kir_json(['ok'=>true,'authenticated'=>false]);
}

$pdo = kir_db();
$stmt = $pdo->prepare('SELECT id, username, full_name, role, phone, email, avatar_url, theme FROM users WHERE id = ? LIMIT 1');
$stmt->execute([(int)$_SESSION['user_id']]);
$u = $stmt->fetch();

if (!$u) {
  kir_json(['ok'=>true,'authenticated'=>false]);
}

kir_json([
  'ok'=>true,
  'authenticated'=>true,
  'user'=>[
    'id'=>(int)$u['id'],
    'login'=>$u['username'],
    'name'=>$u['full_name'] ?: $u['username'],
    'role'=>$u['role'],
    'phone'=>$u['phone'] ?? '',
    'email'=>$u['email'] ?? '',
    'avatar'=>$u['avatar_url'] ?? null,
  ],
  'theme'=>$u['theme'] ?? null,
]);
