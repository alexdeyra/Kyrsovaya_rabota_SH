ИНСТРУКЦИЯ (Open Server Panel 5.4.3) — домен http://kirovsky.local

0) Модули в OSP
   - HTTP: Apache_2.4-PHP_7.2
   - PHP: PHP_7.2
   - MySQL/MariaDB: MySQL-8.0-Win10

1) Размещение проекта
   1) Откройте Open Server Panel (значок в трее).
   2) Меню -> Папка с сайтами.
   3) Создайте папку домена: kirovsky.local
   4) Скопируйте содержимое папки "site" (index.html, css, js, api, db) в:
      <папка OpenServer>\domains\kirovsky.local\
      (например: C:\OpenServer\domains\kirovsky.local\)

2) Запуск сервера
   - Меню -> Настройки -> вкладка "Модули":
     * HTTP: Apache_2.4-PHP_7.2
     * PHP: PHP_7.2
     * MySQL: MySQL-8.0-Win10
   - Меню -> Перезапустить (или Запустить)

3) Создание базы данных
   1) Меню -> Дополнительно -> phpMyAdmin
   2) Вход в MySQL:
      - Пользователь: root
      - Пароль: (пусто)
   3) В phpMyAdmin: вкладка "Импорт" -> выберите файл db/install.sql -> Выполнить

4) Подключение сайта к БД
   - Файл: api/config.php
   - По умолчанию (под OSP):
       host: 127.0.0.1
       port: 3306
       db  : kirovsky
       user: kirovsky
       pass: kirovsky123
   - Если у вас другая конфигурация, измените эти значения.

5) Проверка
   1) Откройте: http://kirovsky.local/
   2) Логин/пароль: admin / admin
   3) После входа создайте инвентаризацию -> создайте опись -> добавьте товары.
   4) Документы -> Сличительная ведомость (CSV для Excel) формируется с товарами из этой инвентаризации.

Примечание
- В этой версии localStorage не используется. Все данные хранятся в MySQL.
