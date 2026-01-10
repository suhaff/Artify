/* ===============================
   ARTIFY DATABASE
   =============================== */

DROP DATABASE IF EXISTS artify;
CREATE DATABASE artify;
USE artify;

/* ===============================
   USERS (BUYER / SELLER / ADMIN)
   =============================== */
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


/* ===============================
   CATEGORY
   =============================== */
CREATE TABLE category (
  category_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  category_name VARCHAR(100) NOT NULL,
  category_desc TEXT
);

/* ===============================
   PRODUCTS (ARTWORKS)
   =============================== */
CREATE TABLE products (
  product_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  dimensions VARCHAR(100),
  price DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(255),
  stock INT DEFAULT 0,
  seller_id BIGINT,
  category_id BIGINT,
  status ENUM('ACTIVE','DISABLED') DEFAULT 'ACTIVE',

  FOREIGN KEY (seller_id) REFERENCES users(user_id),
  FOREIGN KEY (category_id) REFERENCES category(category_id)
);

/* ===============================
   CART (ONE PER USER)
   =============================== */
CREATE TABLE cart (
  cart_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

/* ===============================
   CART ITEMS
   =============================== */
CREATE TABLE cart_items (
  cart_item_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  cart_id BIGINT,
  product_id BIGINT,
  quantity INT DEFAULT 1,

  FOREIGN KEY (cart_id) REFERENCES cart(cart_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

/* ===============================
   WISHLIST (LIKE BUTTON)
   =============================== */
CREATE TABLE wishlist (
  wishlist_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  product_id BIGINT,

  UNIQUE (user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

/* ===============================
   COUPONS
   =============================== */
CREATE TABLE coupons (
  coupon_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(50) UNIQUE NOT NULL,
  discount_percent INT NOT NULL,
  expiry_date DATE,
  active BOOLEAN DEFAULT TRUE
);

/* ===============================
   ORDERS
   =============================== */
CREATE TABLE orders (
  order_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  total_amount DECIMAL(10,2),
  coupon_code VARCHAR(50),
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('PENDING','SHIPPED'),

  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

/* ===============================
   ORDER ITEMS
   =============================== */
CREATE TABLE order_items (
  order_item_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT,
  product_id BIGINT,
  price DECIMAL(10,2),
  quantity INT,

  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

/* ===============================
   SAMPLE DATA (OPTIONAL)
   =============================== */

/* Admin */
INSERT INTO users (name, email, password, role)
VALUES ('Admin', 'admin@artify.com', 'admin123', 'ADMIN');

/* Seller */
INSERT INTO users (name, email, password, role)
VALUES ('Art Seller', 'seller@artify.com', 'seller123', 'SELLER');

/* Buyer */
INSERT INTO users (name, email, password, role)
VALUES ('Buyer One', 'buyer@artify.com', 'buyer123', 'BUYER');

/* Categories */
INSERT INTO category (category_name, category_desc) VALUES
('Painting', 'Hand-painted artworks'),
('Digital', 'Digital illustrations'),
('Poster', 'Poster designs');

/* Products */
INSERT INTO products
(title, description, dimensions, price, image_url, stock, seller_id, category_id)
VALUES
('Starry Night', 'Famous painting', '20x30', 1000.00, 'images/starry.jpg', 10, 2, 1),
('Digital Dreams', 'Modern digital art', '1920x1080', 300.00, 'images/digital.jpg', 20, 2, 2);

/* Coupon */
INSERT INTO coupons (code, discount_percent, expiry_date)
VALUES ('ART10', 10, '2026-12-31');
