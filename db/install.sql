SET NAMES utf8mb4;
SET time_zone = "+00:00";


CREATE DATABASE IF NOT EXISTS `kirovsky` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `kirovsky`;

CREATE USER IF NOT EXISTS 'kirovsky'@'localhost' IDENTIFIED WITH mysql_native_password BY 'kirovsky123';
ALTER USER 'kirovsky'@'localhost' IDENTIFIED WITH mysql_native_password BY 'kirovsky123';
CREATE USER IF NOT EXISTS 'kirovsky'@'127.0.0.1' IDENTIFIED WITH mysql_native_password BY 'kirovsky123';
ALTER USER 'kirovsky'@'127.0.0.1' IDENTIFIED WITH mysql_native_password BY 'kirovsky123';
CREATE USER IF NOT EXISTS 'kirovsky'@'%' IDENTIFIED WITH mysql_native_password BY 'kirovsky123';
ALTER USER 'kirovsky'@'%' IDENTIFIED WITH mysql_native_password BY 'kirovsky123';
GRANT ALL PRIVILEGES ON `kirovsky`.* TO 'kirovsky'@'localhost';
GRANT ALL PRIVILEGES ON `kirovsky`.* TO 'kirovsky'@'127.0.0.1';
GRANT ALL PRIVILEGES ON `kirovsky`.* TO 'kirovsky'@'%';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(64) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(255) DEFAULT NULL,
  `role` VARCHAR(32) NOT NULL DEFAULT 'user',
  `phone` VARCHAR(64) DEFAULT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  `avatar_url` TEXT DEFAULT NULL,
  `theme` ENUM('light','dark') DEFAULT 'light',
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------------
-- Compatibility/migration block
-- If the database was created by an older version, the table `users` may miss
-- some columns/indexes. MySQL's CREATE TABLE IF NOT EXISTS does not alter an
-- existing table, so we ensure required fields exist before inserting seed data.
-- ---------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE ensure_users_schema()
BEGIN
  -- Columns
  IF NOT EXISTS (
    SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'full_name'
  ) THEN
    ALTER TABLE users ADD COLUMN full_name VARCHAR(255) NULL AFTER password_hash;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'role'
  ) THEN
    ALTER TABLE users ADD COLUMN role VARCHAR(32) NOT NULL DEFAULT 'user' AFTER full_name;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'phone'
  ) THEN
    ALTER TABLE users ADD COLUMN phone VARCHAR(64) NULL AFTER role;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'email'
  ) THEN
    ALTER TABLE users ADD COLUMN email VARCHAR(255) NULL AFTER phone;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'avatar_url'
  ) THEN
    ALTER TABLE users ADD COLUMN avatar_url TEXT NULL AFTER email;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'theme'
  ) THEN
    ALTER TABLE users ADD COLUMN theme ENUM('light','dark') NULL DEFAULT 'light' AFTER avatar_url;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'created_at'
  ) THEN
    ALTER TABLE users ADD COLUMN created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER theme;
  END IF;

  -- Unique index on username (required for ON DUPLICATE KEY in seed inserts)
  IF NOT EXISTS (
    SELECT 1 FROM INFORMATION_SCHEMA.STATISTICS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND INDEX_NAME = 'uq_users_username'
  ) THEN
    ALTER TABLE users ADD UNIQUE KEY uq_users_username (username);
  END IF;
END//
DELIMITER ;

CALL ensure_users_schema();
DROP PROCEDURE ensure_users_schema;

CREATE TABLE IF NOT EXISTS `shops` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `number` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `location` VARCHAR(255) DEFAULT NULL,
  `status` ENUM('active','warning','critical') NOT NULL DEFAULT 'active',
  `last_inventory_date` DATE DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_shops_number` (`number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `barcode` VARCHAR(32) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `price` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `category` VARCHAR(255) DEFAULT NULL,
  `type` ENUM('general','alcohol','beer','cigarettes') NOT NULL DEFAULT 'general',
  `is_random` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_products_barcode` (`barcode`),
  KEY `idx_products_type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `inventories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `shop_id` INT UNSIGNED NOT NULL,
  `type` ENUM('general','alcohol','beer','cigarettes') NOT NULL,
  `date` VARCHAR(32) NOT NULL,
  `reason` VARCHAR(255) NOT NULL,
  `lines` INT NOT NULL DEFAULT 0,
  `amount` DECIMAL(14,2) NOT NULL DEFAULT 0.00,
  `difference` DECIMAL(14,2) NOT NULL DEFAULT 0.00,
  `is_closed` TINYINT(1) NOT NULL DEFAULT 0,
  `status` VARCHAR(32) NOT NULL DEFAULT 'active',
  `created_by` INT UNSIGNED DEFAULT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_inv_shop` (`shop_id`),
  CONSTRAINT `fk_inv_shop` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_inv_user` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `inventory_sheets` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `inventory_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `sheet_date` VARCHAR(32) NOT NULL,
  `lines` INT NOT NULL DEFAULT 0,
  `quantity` DECIMAL(12,3) NOT NULL DEFAULT 0.000,
  `status` VARCHAR(32) NOT NULL DEFAULT 'pending',
  `is_closed` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_sheet_inv` (`inventory_id`),
  CONSTRAINT `fk_sheet_inv` FOREIGN KEY (`inventory_id`) REFERENCES `inventories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `inventory_items` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `sheet_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED DEFAULT NULL,
  `barcode` VARCHAR(32) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `price` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `category` VARCHAR(255) DEFAULT NULL,
  `type` ENUM('general','alcohol','beer','cigarettes') NOT NULL DEFAULT 'general',
  `quantity` DECIMAL(12,3) NOT NULL DEFAULT 0.000,
  `total_price` DECIMAL(14,2) NOT NULL DEFAULT 0.00,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_items_sheet_barcode` (`sheet_id`, `barcode`),
  KEY `idx_items_sheet` (`sheet_id`),
  KEY `idx_items_product` (`product_id`),
  CONSTRAINT `fk_items_sheet` FOREIGN KEY (`sheet_id`) REFERENCES `inventory_sheets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `documents` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `shop_id` INT UNSIGNED NOT NULL,
  `doc_type` VARCHAR(64) NOT NULL,
  `doc_number` VARCHAR(64) NOT NULL,
  `doc_date` VARCHAR(32) NOT NULL,
  `amount` DECIMAL(14,2) NOT NULL DEFAULT 0.00,
  `status` ENUM('open','closed') NOT NULL DEFAULT 'open',
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_docs_shop` (`shop_id`),
  CONSTRAINT `fk_docs_shop` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `operations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `shop_id` INT UNSIGNED NOT NULL,
  `op_number` VARCHAR(64) NOT NULL,
  `op_date` DATETIME NOT NULL,
  `op_type` VARCHAR(64) NOT NULL,
  `comment` TEXT DEFAULT NULL,
  `amount` DECIMAL(14,2) NOT NULL DEFAULT 0.00,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_ops_shop_date` (`shop_id`, `op_date`),
  CONSTRAINT `fk_ops_shop` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `waste_records` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `shop_id` INT UNSIGNED NOT NULL,
  `waste_date` DATETIME NOT NULL,
  `reason` VARCHAR(255) DEFAULT NULL,
  `amount` DECIMAL(14,2) NOT NULL DEFAULT 0.00,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_waste_shop_date` (`shop_id`, `waste_date`),
  CONSTRAINT `fk_waste_shop` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `natural_loss_records` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `shop_id` INT UNSIGNED NOT NULL,
  `loss_date` DATETIME NOT NULL,
  `category` VARCHAR(255) DEFAULT NULL,
  `amount` DECIMAL(14,2) NOT NULL DEFAULT 0.00,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_loss_shop_date` (`shop_id`, `loss_date`),
  CONSTRAINT `fk_loss_shop` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO users (username, password_hash, full_name, role, phone, email, avatar_url, theme, created_at)
VALUES
('admin', '$2y$10$yhqW0jfvscBpvBdQnpOSUeYoyWoN.hQ48BuDHLf5WR0ziaYhVReqi', 'Системный администратор', 'admin', '', '', NULL, 'light', NOW())
ON DUPLICATE KEY UPDATE username=username;

INSERT INTO shops (number, name, location, status, last_inventory_date)
VALUES
(101, 'Магазин #101', 'ул. Маршала Жукова, 13', 'active', NULL),
(102, 'Магазин #102', 'ул. Декабристов, 77Б', 'active', NULL),
(103, 'Магазин #103', 'Сиреневый бульвар, 2', 'active', NULL),
(104, 'Магазин #104', 'ул. Свердлова, 27', 'active', NULL),
(105, 'Магазин #105', 'Билимбаевская ул., 15', 'active', NULL),
(106, 'Магазин #106', 'ул. Восстания, 50', 'critical', NULL)
ON DUPLICATE KEY UPDATE number=number;

INSERT INTO products (barcode, name, price, category, type, is_random, created_at) VALUES
('4601234567890','Молоко Домик в деревне 2.5% 1л',89.90,'Молочные продукты','general',0,NOW()),
('4601234567891','Хлеб Бородинский нарезка 400г',45.50,'Хлебобулочные','general',0,NOW()),
('4601234567892','Яйца куриные С1 10шт',120.00,'Яйца','general',0,NOW()),
('4601234567893','Пельмени Сибирские 1кг',250.00,'Замороженные продукты','general',0,NOW()),
('4601234567894','Мороженое Пломбир 100г',65.00,'Замороженные продукты','general',0,NOW()),
('4601234567897','Водка Русская 0.5л',450.00,'Алкоголь','alcohol',0,NOW()),
('4601234567898','Коньяк Армянский 5* 0.5л',1200.00,'Алкоголь','alcohol',0,NOW()),
('4601234567899','Вино красное сухое 0.75л',650.00,'Алкоголь','alcohol',0,NOW()),
('4601234567900','Вино белое полусладкое 0.75л',580.00,'Алкоголь','alcohol',0,NOW()),
('4601234567901','Шампанское Советское полусладкое 0.75л',350.00,'Алкоголь','alcohol',0,NOW()),
('4601234567902','Виски Jack Daniels 0.7л',2800.00,'Алкоголь','alcohol',0,NOW()),
('4601234567906','Пиво Жигулёвское 0.5л',85.00,'Пиво','beer',0,NOW()),
('4601234567907','Пиво Балтика 9 0.5л',95.00,'Пиво','beer',0,NOW()),
('4601234567908','Пиво Сибирская корона 0.5л',110.00,'Пиво','beer',0,NOW()),
('4601234567925','Сигареты Rothmans 20шт',160.00,'Сигареты','cigarettes',0,NOW()),
('4601234567926','Сигареты LM 20шт',140.00,'Сигареты','cigarettes',0,NOW()),
('4601234567903','Сахар песок 1кг',75.00,'Бакалея','general',0,NOW()),
('4601234567904','Мука пшеничная 1кг',60.00,'Бакалея','general',0,NOW()),
('4601234567905','Соль поваренная 1кг',25.00,'Бакалея','general',0,NOW()),
('4601234567909','Чай Greenfield 100 пак',350.00,'Бакалея','general',0,NOW()),
('4601234567910','Кофе Jacobs 250г',420.00,'Бакалея','general',0,NOW()),
('4601234567911','Шоколад Alpen Gold 100г',95.00,'Кондитерские изделия','general',0,NOW()),
('4601234567912','Печенье Юбилейное 300г',120.00,'Кондитерские изделия','general',0,NOW())
ON DUPLICATE KEY UPDATE barcode=barcode;

INSERT INTO documents (shop_id, doc_type, doc_number, doc_date, amount, status, created_at)
SELECT s.id, 'Приходная накладная', CONCAT('PN-', s.number, '-2025-000123'), '19/06/2025', 45678.90, 'open', NOW() FROM shops s WHERE s.number=101
ON DUPLICATE KEY UPDATE doc_number=doc_number;

