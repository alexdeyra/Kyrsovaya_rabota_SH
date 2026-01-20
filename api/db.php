<?php

function kir_config() {
  static $cfg = null;
  if ($cfg === null) $cfg = require __DIR__ . '/config.php';
  return $cfg;
}

function kir_db() {
  static $pdo = null;
  if ($pdo !== null) return $pdo;

  $cfg = kir_config()['db'];
  $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=%s', $cfg['host'], $cfg['port'], $cfg['name'], $cfg['charset']);

  $pdo = new PDO($dsn, $cfg['user'], $cfg['pass'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
  ]);

  return $pdo;
}

function kir_start_session() {
  $cfg = kir_config();
  if (!empty($cfg['session_name'])) {
    session_name($cfg['session_name']);
  }
  if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
  }
}

function kir_json($data, $status = 200) {
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($data, JSON_UNESCAPED_UNICODE);
  exit;
}


function kir_setup_error_handlers() {
  // Конвертируем предупреждения/нотисы в исключения, чтобы отдавать JSON вместо HTML
  set_error_handler(function ($severity, $message, $file, $line) {
    throw new ErrorException($message, 0, $severity, $file, $line);
  });

  // Любые необработанные исключения отдаём JSON
  set_exception_handler(function ($e) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
      'ok' => false,
      'error' => 'SERVER_ERROR',
      'message' => $e->getMessage(),
    ], JSON_UNESCAPED_UNICODE);
    exit;
  });
}

kir_setup_error_handlers();

function kir_input_json() {
  $raw = file_get_contents('php://input');
  $data = json_decode($raw, true);
  if (!is_array($data)) return [];
  return $data;
}

function kir_require_login() {
  kir_start_session();
  if (empty($_SESSION['user_id'])) {
    kir_json(['ok' => false, 'error' => 'NOT_AUTHENTICATED'], 401);
  }
}

function kir_now() {
  return date('Y-m-d H:i:s');
}

function kir_inventory_type_allows_product($inventoryType, $productType) {
  $inventoryType = strtolower(trim((string)$inventoryType));
  $productType = strtolower(trim((string)$productType));

  if ($inventoryType === 'general') {
    return !in_array($productType, ['alcohol','beer','cigarettes'], true);
  }
  if ($inventoryType === 'alcohol') return $productType === 'alcohol';
  if ($inventoryType === 'beer') return $productType === 'beer';
  if ($inventoryType === 'cigarettes') return $productType === 'cigarettes';

  // неизвестный тип — запрещаем
  return false;
}

function kir_random_product($barcode, $inventoryType) {
  $inventoryType = strtolower($inventoryType);
  $templates = [
    'alcohol' => [
      ['name' => 'Водка Премиум 0.5л', 'category' => 'Алкоголь', 'price' => 500.00, 'type' => 'alcohol'],
      ['name' => 'Вино красное 0.75л', 'category' => 'Алкоголь', 'price' => 800.00, 'type' => 'alcohol'],
      ['name' => 'Коньяк 0.5л', 'category' => 'Алкоголь', 'price' => 1500.00, 'type' => 'alcohol'],
    ],
    'beer' => [
      ['name' => 'Пиво Светлое 0.5л', 'category' => 'Пиво', 'price' => 95.00, 'type' => 'beer'],
      ['name' => 'Пиво Темное 0.5л', 'category' => 'Пиво', 'price' => 110.00, 'type' => 'beer'],
    ],
    'cigarettes' => [
      ['name' => 'Сигареты Легкие 20шт', 'category' => 'Сигареты', 'price' => 160.00, 'type' => 'cigarettes'],
      ['name' => 'Сигареты Крепкие 20шт', 'category' => 'Сигареты', 'price' => 165.00, 'type' => 'cigarettes'],
    ],
    'general' => [
      ['name' => 'Хлеб пшеничный нарезной 500 г', 'category' => 'Хлеб', 'price' => 55.00, 'type' => 'general'],
      ['name' => 'Батон нарезной 400 г', 'category' => 'Хлеб', 'price' => 49.00, 'type' => 'general'],
      ['name' => 'Молоко 2.5% 1 л', 'category' => 'Молочные', 'price' => 89.00, 'type' => 'general'],
      ['name' => 'Кефир 2.5% 1 л', 'category' => 'Молочные', 'price' => 92.00, 'type' => 'general'],
      ['name' => 'Сметана 20% 300 г', 'category' => 'Молочные', 'price' => 119.00, 'type' => 'general'],
      ['name' => 'Сыр твёрдый 200 г', 'category' => 'Молочные', 'price' => 219.00, 'type' => 'general'],
      ['name' => 'Яйцо куриное С1 10 шт', 'category' => 'Бакалея', 'price' => 109.00, 'type' => 'general'],
      ['name' => 'Сахар-песок 1 кг', 'category' => 'Бакалея', 'price' => 89.00, 'type' => 'general'],
      ['name' => 'Соль пищевая 1 кг', 'category' => 'Бакалея', 'price' => 29.00, 'type' => 'general'],
      ['name' => 'Рис круглозёрный 900 г', 'category' => 'Бакалея', 'price' => 119.00, 'type' => 'general'],
      ['name' => 'Гречка 900 г', 'category' => 'Бакалея', 'price' => 139.00, 'type' => 'general'],
      ['name' => 'Макароны 450 г', 'category' => 'Бакалея', 'price' => 69.00, 'type' => 'general'],
      ['name' => 'Мука пшеничная 2 кг', 'category' => 'Бакалея', 'price' => 109.00, 'type' => 'general'],
      ['name' => 'Масло подсолнечное 1 л', 'category' => 'Бакалея', 'price' => 149.00, 'type' => 'general'],
      ['name' => 'Кетчуп 500 г', 'category' => 'Соусы', 'price' => 119.00, 'type' => 'general'],
      ['name' => 'Майонез 400 г', 'category' => 'Соусы', 'price' => 109.00, 'type' => 'general'],
      ['name' => 'Чай чёрный 100 пакетиков', 'category' => 'Чай/кофе', 'price' => 199.00, 'type' => 'general'],
      ['name' => 'Кофе растворимый 95 г', 'category' => 'Чай/кофе', 'price' => 329.00, 'type' => 'general'],
      ['name' => 'Вода питьевая 1.5 л', 'category' => 'Напитки', 'price' => 49.00, 'type' => 'general'],
      ['name' => 'Сок яблочный 1 л', 'category' => 'Напитки', 'price' => 129.00, 'type' => 'general'],
      ['name' => 'Печенье овсяное 300 г', 'category' => 'Сладости', 'price' => 99.00, 'type' => 'general'],
      ['name' => 'Шоколад молочный 90 г', 'category' => 'Сладости', 'price' => 89.00, 'type' => 'general'],
      ['name' => 'Конфеты карамель 250 г', 'category' => 'Сладости', 'price' => 159.00, 'type' => 'general'],
      ['name' => 'Колбаса варёная 400 г', 'category' => 'Мясо', 'price' => 239.00, 'type' => 'general'],
      ['name' => 'Сосиски молочные 450 г', 'category' => 'Мясо', 'price' => 249.00, 'type' => 'general'],
      ['name' => 'Куриное филе охлаждённое 1 кг', 'category' => 'Мясо', 'price' => 379.00, 'type' => 'general'],
      ['name' => 'Стиральный порошок 2.4 кг', 'category' => 'Бытовая химия', 'price' => 499.00, 'type' => 'general'],
      ['name' => 'Средство для мытья посуды 450 мл', 'category' => 'Бытовая химия', 'price' => 159.00, 'type' => 'general'],
      ['name' => 'Туалетная бумага 8 рулонов', 'category' => 'Бытовые товары', 'price' => 179.00, 'type' => 'general'],
      ['name' => 'Салфетки бумажные 100 шт', 'category' => 'Бытовые товары', 'price' => 79.00, 'type' => 'general'],
      ['name' => 'Зубная паста 100 мл', 'category' => 'Гигиена', 'price' => 129.00, 'type' => 'general'],
      ['name' => 'Шампунь 400 мл', 'category' => 'Гигиена', 'price' => 219.00, 'type' => 'general'],
      ['name' => 'Мыло жидкое 500 мл', 'category' => 'Гигиена', 'price' => 149.00, 'type' => 'general'],
    ],
  ];

  $list = $templates[$inventoryType] ?? $templates['general'];
  $t = $list[array_rand($list)];

  // Вариация цены +-10%
  $variation = 0.9 + (mt_rand(0, 2000) / 10000.0); // 0.9..1.1
  $t['price'] = round($t['price'] * $variation, 2);
  $t['barcode'] = $barcode;
  $t['is_random'] = 1;

  return $t;
}

