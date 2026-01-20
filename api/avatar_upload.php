<?php
require __DIR__ . '/db.php';
kir_require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  kir_json(['ok'=>false,'error'=>'METHOD_NOT_ALLOWED'], 405);
}

if (empty($_FILES['avatar']) || !is_uploaded_file($_FILES['avatar']['tmp_name'])) {
  kir_json(['ok'=>false,'error'=>'NO_FILE'], 400);
}

$f = $_FILES['avatar'];
if (!empty($f['error'])) {
  kir_json(['ok'=>false,'error'=>'UPLOAD_ERROR','message'=>'Код ошибки загрузки: '.$f['error']], 400);
}

$max = 5 * 1024 * 1024; // 5MB
if ($f['size'] > $max) {
  kir_json(['ok'=>false,'error'=>'FILE_TOO_LARGE'], 400);
}

// Проверяем, что это изображение
$imgInfo = @getimagesize($f['tmp_name']);
if ($imgInfo === false) {
  kir_json(['ok'=>false,'error'=>'NOT_IMAGE'], 400);
}

$mime = $imgInfo['mime'] ?? '';
$allowed = [
  'image/jpeg' => 'jpg',
  'image/pjpeg' => 'jpg',
  'image/png' => 'png',
  'image/gif' => 'gif',
  'image/webp' => 'webp',
];
if (!isset($allowed[$mime])) {
  kir_json(['ok'=>false,'error'=>'UNSUPPORTED_TYPE','message'=>'Разрешены: JPG/PNG/GIF/WEBP'], 400);
}
$ext = $allowed[$mime];

$userId = (int)$_SESSION['user_id'];
$root = realpath(__DIR__ . '/..');
$dir = $root . '/uploads/avatars';
if (!is_dir($dir)) {
  @mkdir($dir, 0755, true);
}

// Удаляем старый аватар, если он наш и лежит в uploads/avatars
$pdo = kir_db();
$st = $pdo->prepare('SELECT avatar_url FROM users WHERE id = ? LIMIT 1');
$st->execute([$userId]);
$old = $st->fetch();
$oldUrl = $old ? (string)($old['avatar_url'] ?? '') : '';
if ($oldUrl && strpos($oldUrl, 'uploads/avatars/') === 0) {
  $oldPath = $root . '/' . $oldUrl;
  $oldReal = realpath($oldPath);
  $dirReal = realpath($dir);
  if ($oldReal && $dirReal && strpos($oldReal, $dirReal) === 0) {
    @unlink($oldReal);
  }
}

$rand = bin2hex(random_bytes(6));
$filename = 'u' . $userId . '_' . date('YmdHis') . '_' . $rand . '.' . $ext;
$target = $dir . '/' . $filename;

if (!move_uploaded_file($f['tmp_name'], $target)) {
  kir_json(['ok'=>false,'error'=>'MOVE_FAILED'], 500);
}
@chmod($target, 0644);

$url = 'uploads/avatars/' . $filename;
$up = $pdo->prepare('UPDATE users SET avatar_url = ? WHERE id = ?');
$up->execute([$url, $userId]);

kir_json(['ok'=>true,'avatar'=>$url]);
