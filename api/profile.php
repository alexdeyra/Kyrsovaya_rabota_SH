<?php
require __DIR__ . '/db.php';
kir_require_login();

$pdo = kir_db();
$method = $_SERVER['REQUEST_METHOD'];
$userId = (int)$_SESSION['user_id'];

if ($method === 'GET') {
  $stmt = $pdo->prepare('SELECT id, username, full_name, role, phone, email, avatar_url FROM users WHERE id = ? LIMIT 1');
  $stmt->execute([$userId]);
  $u = $stmt->fetch();
  if (!$u) kir_json(['ok'=>false,'error'=>'NOT_FOUND'], 404);

  kir_json([
    'ok' => true,
    'profile' => [
      'id' => (int)$u['id'],
      'login' => $u['username'],
      'name' => $u['full_name'] ?: $u['username'],
      'role' => $u['role'],
      'phone' => $u['phone'] ?? '',
      'email' => $u['email'] ?? '',
      'avatar' => $u['avatar_url'] ?? null,
    ]
  ]);
}

if ($method === 'POST') {
  $data = kir_input_json();
  $full = trim((string)($data['name'] ?? ''));
  $phone = trim((string)($data['phone'] ?? ''));
  $email = trim((string)($data['email'] ?? ''));
  $avatar = $data['avatar'] ?? null;
  if ($avatar !== null) $avatar = trim((string)$avatar);

  $stmt = $pdo->prepare('UPDATE users SET full_name=?, phone=?, email=?, avatar_url=? WHERE id=?');
  $stmt->execute([$full, $phone, $email, $avatar, $userId]);
  kir_json(['ok'=>true]);
}

kir_json(['ok'=>false,'error'=>'METHOD_NOT_ALLOWED'], 405);
