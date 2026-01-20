<?php
require __DIR__ . '/db.php';
kir_require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  kir_json(['ok'=>false,'error'=>'METHOD_NOT_ALLOWED'], 405);
}

$userId = (int)$_SESSION['user_id'];
$pdo = kir_db();

$st = $pdo->prepare('SELECT avatar_url FROM users WHERE id = ? LIMIT 1');
$st->execute([$userId]);
$r = $st->fetch();
$url = $r ? (string)($r['avatar_url'] ?? '') : '';

$root = realpath(__DIR__ . '/..');
$dir = $root . '/uploads/avatars';

if ($url && strpos($url, 'uploads/avatars/') === 0) {
  $path = $root . '/' . $url;
  $real = realpath($path);
  $dirReal = realpath($dir);
  if ($real && $dirReal && strpos($real, $dirReal) === 0) {
    @unlink($real);
  }
}

$up = $pdo->prepare('UPDATE users SET avatar_url = NULL WHERE id = ?');
$up->execute([$userId]);

kir_json(['ok'=>true]);
