<?php
require __DIR__ . '/../db.php';
kir_require_login();

$invId = (int)($_GET['inventory_id'] ?? 0);
$mode = strtolower(trim((string)($_GET['mode'] ?? 'full'))); // full | totals
$format = strtolower(trim((string)($_GET['format'] ?? 'csv'))); // csv

if ($invId <= 0) kir_json(['ok'=>false,'error'=>'NO_INVENTORY_ID'], 400);

$pdo = kir_db();
$stmt = $pdo->prepare('SELECT id, type, date, reason, amount, difference, is_closed FROM inventories WHERE id=? LIMIT 1');
$stmt->execute([$invId]);
$inv = $stmt->fetch();
if (!$inv) kir_json(['ok'=>false,'error'=>'NOT_FOUND'], 404);

// Список товаров только из этой инвентаризации
$itemsStmt = $pdo->prepare('SELECT it.barcode, it.name, it.price, it.category, it.type, it.quantity, it.total_price
                            FROM inventory_items it
                            JOIN inventory_sheets s ON s.id = it.sheet_id
                            WHERE s.inventory_id = ?
                            ORDER BY it.category, it.name');
$itemsStmt->execute([$invId]);
$items = $itemsStmt->fetchAll();

// Группировка по типу инвентаризации (алкоголь/пиво/сигареты/общая) и по категории
$groups = [];
$totalSum = 0.0;
foreach ($items as $it) {
  $cat = $it['category'] ?: 'Без категории';
  if (!isset($groups[$cat])) {
    $groups[$cat] = ['sum'=>0.0, 'count'=>0, 'items'=>[]];
  }
  $groups[$cat]['items'][] = $it;
  $groups[$cat]['sum'] += (float)$it['total_price'];
  $groups[$cat]['count'] += 1;
  $totalSum += (float)$it['total_price'];
}
$totalSum = round($totalSum, 2);

$difference = (float)$inv['difference'];
$amount = (float)$inv['amount'];

// Важно: знак в файле должен совпадать со знаком на сайте.
// Мы записываем difference как есть.

$filename = 'slich-vedomost-inv-' . $invId . '.csv';
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename="' . $filename . '"');

$out = fopen('php://output', 'w');
// BOM для Excel
fwrite($out, "\xEF\xBB\xBF");

fputcsv($out, ['Сличительная ведомость'], ';');
fputcsv($out, ['Инвентаризация ID', $invId], ';');
fputcsv($out, ['Дата', $inv['date']], ';');
fputcsv($out, ['Тип', $inv['type']], ';');
fputcsv($out, ['Название', $inv['reason']], ';');
fputcsv($out, [], ';');

if ($mode === 'totals') {
  fputcsv($out, ['Категория', 'Кол-во позиций', 'Сумма, ₽'], ';');
  foreach ($groups as $cat => $g) {
    fputcsv($out, [$cat, $g['count'], number_format($g['sum'], 2, '.', '')], ';');
  }
  fputcsv($out, [], ';');
  fputcsv($out, ['ИТОГО сумма', number_format($totalSum, 2, '.', '')], ';');
  fputcsv($out, ['ИТОГО разница', ($difference>=0?'+':'') . number_format($difference, 2, '.', '')], ';');
  fclose($out);
  exit;
}

// FULL
fputcsv($out, ['Штрихкод', 'Наименование', 'Категория', 'Цена, ₽', 'Количество', 'Сумма, ₽'], ';');

foreach ($groups as $cat => $g) {
  // заголовок группы
  fputcsv($out, [$cat], ';');
  foreach ($g['items'] as $it) {
    fputcsv($out, [
      $it['barcode'],
      $it['name'],
      $it['category'],
      number_format((float)$it['price'], 2, '.', ''),
      number_format((float)$it['quantity'], 3, '.', ''),
      number_format((float)$it['total_price'], 2, '.', ''),
    ], ';');
  }
  fputcsv($out, ['ИТОГО по категории', '', '', '', '', number_format($g['sum'], 2, '.', '')], ';');
  fputcsv($out, [], ';');
}

fputcsv($out, ['ИТОГО сумма', '', '', '', '', number_format($totalSum, 2, '.', '')], ';');
fputcsv($out, ['ИТОГО разница', '', '', '', '', ($difference>=0?'+':'') . number_format($difference, 2, '.', '')], ';');

fclose($out);
