<?php
// Open Server Panel 5.4.3 / PHP 7.2 / MySQL 8.0
// Настройки подключения к БД.

return [
  'db' => [
    'host' => 'localhost',
    'port' => 3306,
    'name' => 'kirovsky',
    'user' => 'kirovsky',
    'pass' => 'kirovsky123',
    'charset' => 'utf8mb4',
  ],
  // В проде обязательно поменяй.
  'session_name' => 'KIR_SESSION',
];
