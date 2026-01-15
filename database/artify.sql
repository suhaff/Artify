/* ===============================
   ARTIFY ORACLE DATABASE SCHEMA
   =============================== */

/* ===============================
   SEQUENCES
   =============================== */
CREATE SEQUENCE users_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE category_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE products_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE orders_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE order_items_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE complaints_seq START WITH 1 INCREMENT BY 1;

/* ===============================
   USERS
   =============================== */
CREATE TABLE users (
    user_id NUMBER PRIMARY KEY,
    full_name VARCHAR2(100) NOT NULL,
    age NUMBER,
    email VARCHAR2(100) UNIQUE NOT NULL,
    username VARCHAR2(50) UNIQUE NOT NULL,
    password_hash VARCHAR2(255) NOT NULL,
    role VARCHAR2(10)
        CHECK (role IN ('BUYER','SELLER','ADMIN')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* ===============================
   CATEGORY
   =============================== */
CREATE TABLE category (
    category_id NUMBER PRIMARY KEY,
    category_name VARCHAR2(100) NOT NULL,
    category_desc CLOB
);

/* ===============================
   PRODUCTS
   =============================== */
CREATE TABLE products (
    product_id NUMBER PRIMARY KEY,
    title VARCHAR2(150) NOT NULL,
    description CLOB,
    dimensions VARCHAR2(100),
    price NUMBER(10,2) NOT NULL,
    image_url VARCHAR2(255),
    stock NUMBER DEFAULT 0,
    sold NUMBER DEFAULT 0,
    seller_id NUMBER,
    category_id NUMBER,
    status VARCHAR2(10)
        CHECK (status IN ('ACTIVE','DISABLED')),

    CONSTRAINT fk_products_seller
        FOREIGN KEY (seller_id) REFERENCES users(user_id),

    CONSTRAINT fk_products_category
        FOREIGN KEY (category_id) REFERENCES category(category_id)
);

/* ===============================
   ORDERS
   =============================== */
CREATE TABLE orders (
    order_id NUMBER PRIMARY KEY,
    user_id NUMBER,
    total_amount NUMBER(10,2),
    coupon_code VARCHAR2(50),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR2(15)
        CHECK (status IN ('PENDING','SHIPPED','COMPLETED')),

    CONSTRAINT fk_orders_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
);

/* ===============================
   ORDER ITEMS
   =============================== */
CREATE TABLE order_items (
    order_item_id NUMBER PRIMARY KEY,
    order_id NUMBER,
    product_id NUMBER,
    price NUMBER(10,2),
    quantity NUMBER,

    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id) REFERENCES orders(order_id),

    CONSTRAINT fk_order_items_product
        FOREIGN KEY (product_id) REFERENCES products(product_id)
);

/* ===============================
   COMPLAINTS
   =============================== */
CREATE TABLE complaints (
    complaint_id NUMBER PRIMARY KEY,
    user_email VARCHAR2(100),
    message CLOB NOT NULL,
    status VARCHAR2(10)
        CHECK (status IN ('PENDING','RESOLVED')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* ===============================
   SAMPLE DATA
   =============================== */

/* USERS */
INSERT INTO users VALUES (
    users_seq.NEXTVAL,
    'Admin',
    30,
    'admin@email.com',
    'admin',
    'admin123',
    'ADMIN',
    CURRENT_TIMESTAMP
);

INSERT INTO users VALUES (
    users_seq.NEXTVAL,
    'Art Seller',
    28,
    'seller@email.com',
    'seller',
    'seller123',
    'SELLER',
    CURRENT_TIMESTAMP
);

INSERT INTO users VALUES (
    users_seq.NEXTVAL,
    'Buyer One',
    22,
    'buyer@email.com',
    'buyer',
    'buyer123',
    'BUYER',
    CURRENT_TIMESTAMP
);

/* CATEGORIES */
INSERT INTO category VALUES (
    category_seq.NEXTVAL,
    'Painting',
    'Hand-painted artworks'
);

INSERT INTO category VALUES (
    category_seq.NEXTVAL,
    'Digital',
    'Digital illustrations'
);

/* PRODUCTS */
INSERT INTO products VALUES (
    products_seq.NEXTVAL,
    'Starry Night',
    'Famous painting',
    '20x30',
    1000.00,
    'images/starry.jpg',
    10,
    0,
    2,
    1,
    'ACTIVE'
);

INSERT INTO products VALUES (
    products_seq.NEXTVAL,
    'Digital Dreams',
    'Modern digital art',
    '1920x1080',
    300.00,
    'images/digital.jpg',
    20,
    0,
    2,
    2,
    'ACTIVE'
);

COMMIT;
