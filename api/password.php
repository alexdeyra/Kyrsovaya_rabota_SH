<?php
require __DIR__ . '/db.php';
kir_require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  kir_json(['ok'=>false,'error'=>'METHOD_NOT_ALLOWED'], 405);
}

$pdo = kir_db();
$data = kir_input_json();

$current = (string)($data['currentPassword'] ?? '');
$new = (string)($data['newPassword'] ?? '');

if ($current === '' || $new === '') {
  kir_json(['ok'=>false,'error'=>'VALIDATION','message'=>'Заполните все поля'], 400);
}

if (mb_strlen($new) < 6) {
  kir_json(['ok'=>false,'error'=>'VALIDATION','message'=>'Новый пароль должен быть не менее 6 символов'], 400);
}

$userId = (int)$_SESSION['user_id'];
$stmt = $pdo->prepare('SELECT id, password_hash FROM users WHERE id=? LIMIT 1');
$stmt->execute([$userId]);
$u = $stmt->fetch();
if (!$u) {
  kir_json(['ok'=>false,'error'=>'NOT_FOUND'], 404);
}

if (!password_verify($current, $u['password_hash'])) {
  kir_json(['ok'=>false,'error'=>'INVALID_CURRENT_PASSWORD','message'=>'Неверный текущий пароль'], 400);
}

if (password_verify($new, $u['password_hash'])) {
  kir_json(['ok'=>false,'error'=>'SAME_PASSWORD','message'=>'Новый пароль не должен совпадать с текущим'], 400);
}

$hash = password_hash($new, PASSWORD_BCRYPT);
$upd = $pdo->prepare('UPDATE users SET password_hash=? WHERE id=?');
$upd->execute([$hash, $userId]);

kir_json(['ok'=>true]);
