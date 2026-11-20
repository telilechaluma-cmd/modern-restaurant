-- ==========================================================
-- TALILE RESTAURANT & LOUNGE - COMPLETE DATABASE SCHEMA
-- Compatible with MySQL 5.7+, 8.0+ and MariaDB
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `talile_restaurant` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `talile_restaurant`;

-- 1. ADMIN & USERS TABLE
CREATE TABLE IF NOT EXISTS `users` (
    `id` VARCHAR(50) PRIMARY KEY,
    `full_name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) UNIQUE NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'manager', 'customer') DEFAULT 'customer',
    `phone_number` VARCHAR(30) NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. FOOD CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS `categories` (
    `id` VARCHAR(50) PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) UNIQUE NOT NULL,
    `amharic_name` VARCHAR(150) NULL,
    `oromo_name` VARCHAR(150) NULL,
    `description` TEXT NULL,
    `icon` VARCHAR(50) NULL,
    `image_url` VARCHAR(255) NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. MENU ITEMS TABLE
CREATE TABLE IF NOT EXISTS `menu_items` (
    `id` VARCHAR(50) PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `amharic_name` VARCHAR(150) NULL,
    `oromo_name` VARCHAR(150) NULL,
    `description` TEXT NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `category_id` VARCHAR(50) NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,
    `is_available` BOOLEAN DEFAULT TRUE,
    `is_popular` BOOLEAN DEFAULT FALSE,
    `is_chef_special` BOOLEAN DEFAULT FALSE,
    `preparation_time` VARCHAR(50) DEFAULT '20-30 mins',
    `calories` INT NULL,
    `spice_level` ENUM('Non-Spicy', 'Mild', 'Medium', 'Hot Berbere') DEFAULT 'Mild',
    `rating` DECIMAL(3, 1) DEFAULT 4.8,
    `review_count` INT DEFAULT 12,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. TABLE RESERVATIONS TABLE (Phase 04 requirement)
CREATE TABLE IF NOT EXISTS `reservations` (
    `id` VARCHAR(50) PRIMARY KEY,
    `full_name` VARCHAR(150) NOT NULL,
    `phone_number` VARCHAR(30) NOT NULL,
    `reservation_date` DATE NOT NULL,
    `reservation_time` VARCHAR(20) NOT NULL,
    `guests` VARCHAR(50) NOT NULL,
    `seating_area` VARCHAR(100) DEFAULT 'Main Dining Hall',
    `occasion` VARCHAR(100) DEFAULT 'Dinner',
    `special_notes` TEXT NULL,
    `status` ENUM('Pending', 'Confirmed', 'Seated', 'Cancelled') DEFAULT 'Pending',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. ORDERS TABLE (Phase 04 requirement)
CREATE TABLE IF NOT EXISTS `orders` (
    `id` VARCHAR(50) PRIMARY KEY,
    `order_number` VARCHAR(50) UNIQUE NOT NULL,
    `customer_name` VARCHAR(150) NOT NULL,
    `phone_number` VARCHAR(30) NOT NULL,
    `email` VARCHAR(150) NULL,
    `delivery_subcity` VARCHAR(100) NOT NULL,
    `delivery_address` TEXT NOT NULL,
    `landmark` VARCHAR(255) NULL,
    `order_type` ENUM('Delivery', 'Pickup') DEFAULT 'Delivery',
    `order_status` ENUM('Pending', 'Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered', 'Cancelled') DEFAULT 'Pending',
    `payment_method` ENUM('Telebirr', 'CBE Birr', 'Cash on Delivery', 'Card') DEFAULT 'Telebirr',
    `payment_status` ENUM('Pending', 'Paid', 'Failed') DEFAULT 'Pending',
    `subtotal` DECIMAL(10, 2) NOT NULL,
    `delivery_fee` DECIMAL(10, 2) DEFAULT 0.00,
    `discount` DECIMAL(10, 2) DEFAULT 0.00,
    `total_amount` DECIMAL(10, 2) NOT NULL,
    `notes` TEXT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. ORDER LINE ITEMS TABLE
CREATE TABLE IF NOT EXISTS `order_items` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` VARCHAR(50) NOT NULL,
    `menu_item_id` VARCHAR(50) NOT NULL,
    `item_name` VARCHAR(150) NOT NULL,
    `quantity` INT NOT NULL DEFAULT 1,
    `unit_price` DECIMAL(10, 2) NOT NULL,
    `total_price` DECIMAL(10, 2) NOT NULL,
    `portion` VARCHAR(50) NULL,
    `spice_level` VARCHAR(50) NULL,
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. CONTACT MESSAGES / INQUIRIES
CREATE TABLE IF NOT EXISTS `contact_messages` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `full_name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `phone_number` VARCHAR(30) NULL,
    `subject` VARCHAR(200) NOT NULL,
    `message` TEXT NOT NULL,
    `is_read` BOOLEAN DEFAULT FALSE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. CUSTOMER REVIEWS
CREATE TABLE IF NOT EXISTS `reviews` (
    `id` VARCHAR(50) PRIMARY KEY,
    `customer_name` VARCHAR(150) NOT NULL,
    `rating` INT DEFAULT 5,
    `comment` TEXT NOT NULL,
    `dish_name` VARCHAR(150) NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================================
-- SEED INITIAL DATA
-- ==========================================================

-- Insert Default Admin User (Password: admin123)
INSERT INTO `users` (`id`, `full_name`, `email`, `password_hash`, `role`, `phone_number`)
VALUES ('usr-admin', 'TALILE Admin', 'admin@talile.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', '0911234567')
ON DUPLICATE KEY UPDATE `full_name` = VALUES(`full_name`);

-- Insert Categories
INSERT INTO `categories` (`id`, `name`, `slug`, `amharic_name`, `oromo_name`, `description`, `icon`) VALUES
('cat-breakfast', 'Breakfast', 'breakfast', 'ቁርስ', 'Nyaata Ganamaa (Ciree)', 'Chechebsa, Ful, freshly scrambled eggs, and traditional morning breakfasts.', 'Sun'),
('cat-lunch-dinner', 'Lunch and Dinner', 'lunch-dinner', 'ምሳ እና እራት', 'Nyaata Guyyaa fi Galgalaa', 'Prime steaks, rosemary lamb, grilled steaks, and artisan Italian pastas.', 'Utensils'),
('cat-ethiopian', 'Traditional Ethiopian Food', 'traditional-ethiopian', 'ባህላዊ የኢትዮጵያ ምግቦች', 'Nyaata Aadaa Itoophiyaa', 'Royal Doro Wat, Special Shekla Tibs, and pure teff injera.', 'Flame'),
('cat-pizza-burgers', 'Pizza and Burgers', 'pizza-burgers', 'ፒዛ እና በርገር', 'Piizaa fi Baargarii', 'Wood-fired sourdough pizzas and gourmet smashed burgers.', 'Pizza'),
('cat-drinks-juices', 'Drinks and Juices', 'drinks-juices', 'መጠጦች እና ጭማቂዎች', 'Dhugaatii fi Cuunfaa Firii', 'Special Spris juice, Ethiopian coffee ceremony, and cocktails.', 'Coffee'),
('cat-snacks-desserts', 'Desserts and Snacks', 'desserts-snacks', 'ጣፋጭ እና መክሰስ', 'Mimmiltoo fi Miʼaawaa', 'Pistachio baklava, chocolate lava cake, and fresh pastries.', 'Cake')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- Insert Popular Menu Items
INSERT INTO `menu_items` (`id`, `name`, `amharic_name`, `oromo_name`, `description`, `price`, `category_id`, `image_url`, `is_available`, `is_popular`, `is_chef_special`, `preparation_time`, `spice_level`) VALUES
('eth-01', 'TALILE Royal Doro Wat', 'ልዩ የሀበሻ ዶሮ ወጥ', 'Kukkuubee Doro Wat Addaa', 'Slow-simmered chicken drumstick with organic berbere and spiced clarified butter.', 680.00, 'cat-ethiopian', '/images/dishes/doro-wat.jpg', 1, 1, 1, '25-35 mins', 'Hot Berbere'),
('eth-02', 'Special Shekla Tibs', 'ልዩ የሸክላ ጥብስ', 'Tibs Shaklaa Addaa', 'Tender cubed beef tenderloin seared with rosemary, sweet onions, and kibe.', 590.00, 'cat-ethiopian', '/images/dishes/shekla-tibs.jpg', 1, 1, 1, '20-25 mins', 'Medium'),
('brk-01', 'Honey Glazed Chechebsa', 'ማር ጨጨብሳ', 'Cicibsaa Dammaa', 'Shredded kitta bread toasted in spiced butter and organic highland honey.', 320.00, 'cat-breakfast', '/images/dishes/chechebsa.png', 1, 1, 0, '15-20 mins', 'Non-Spicy'),
('piz-01', 'Wood-Fired Truffle Margherita', 'ማርጋሪታ ፒዛ', 'Piizaa Maargariitaa', 'San Marzano tomatoes, fresh buffalo mozzarella, fresh basil, and truffle glaze.', 520.00, 'cat-pizza-burgers', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80', 1, 1, 0, '20 mins', 'Non-Spicy'),
('drk-01', 'Signature Layered Spris Juice', 'ልዩ ስፕሪስ ጭማቂ', 'Cuunfaa Spriisii Addaa', 'Freshly pureed avocado, sweet mango, and ripe papaya layered with lime and vimto.', 180.00, 'cat-drinks-juices', 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80', 1, 1, 0, '10 mins', 'Non-Spicy')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);
