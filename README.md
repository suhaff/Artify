# Artify – Online Art Gallery & Auction Platform  
**CAT201 – Integrated Software Development Workshop**  
Developed by: **Team Artify**  
- Numaan Suhaff (Backend & Integration)  
- Parisa (Frontend Developer)  
- Leena (Database & Cart System)

---

## Project Overview  
**Artify** is an online art gallery and artwork purchasing platform built using:  

- **Java (Servlets + OOP)**
- **HTML & CSS**
- **MySQL Database (JDBC)**
- **MVC-like architecture**

The system allows users to:

Browse artworks  
--> Add artworks to the cart  
--> Proceed to checkout  
--> Place an order  
--> Store order details in the database  
--> Allow admin to manage categories and artworks  

---

## Features

### Customer Features
- Customer registration & login  
- Browse artworks by category  
- View artwork details  
- Add/remove items from cart  
- Checkout & confirm order  

### Cart Features (Leena)
- Add artwork to cart  
- Remove artwork from cart  
- Update quantity  
- Calculate total price  
- Pass cart data to checkout process  

### Checkout System (Numaan)
The checkout module processes:

- Customer details  
- Cart items  
- Generates an **order entry** in `ORDERS` table  
- Inserts line items into `ORDERS_TABLE`  
- Uses **transaction management** to ensure order consistency  

Fully implemented in **CheckoutServlet.java**.

---

## Database Structure  

### Main Tables  
| Table | Purpose |
|-------|---------|
| **CUSTOMER** | Stores customer details |
| **ARTWORKS** | Stores products (art) |
| **CATEGORY** | Organized gallery categories |
| **CART** | Customer’s items |
| **ORDERS** | Final order summary |
| **ORDERS_TABLE** | Items inside each order |
| **PAYMENT** | Payment records |
| **ADMINS** | Admin login |

Full SQL file is included in `db/artify.sql`.

---

## Project Structure

```
Artify/
│
├── web/
│   ├── index.html
│   ├── about.html
│   ├── catalogue.html
│   ├── checkout.html
│   ├── success.html
│   └── css/
│       └── style.css
│
├── src/com/artify/
│   ├── ArtItem.java
│   ├── Cart.java
│   ├── DatabaseHandler.java
│   ├── CheckoutServlet.java   ← (Numaan)
│   ├── CatalogueServlet.java
│   └── ...
│
├── db/
│   └── artify.sql
│
└── WEB-INF/
    └── web.xml
```

---

## Backend Modules

### DatabaseHandler.java  
Handles database connection using JDBC.

### Cart.java (Leena)  
Stores cart items, quantity, and total price logic.

### CheckoutServlet.java (Numaan)
Handles:
- Validating checkout form  
- Creating order  
- Storing order items  
- Managing SQL transactions  
- Redirecting to success page  

---

## Frontend Pages (Parisa)

Includes:

- Home page  
- About page  
- Catalogue page  
- Checkout page  
- Success page  

All pages are built using pure HTML & CSS with shared styling.

---

## How to Run the Project

### 1. Import project into NetBeans / IntelliJ  
Ensure Java and Tomcat are installed.

### 2. Create MySQL database  
Run the SQL script located in:

```
db/artify.sql
```

### 3. Configure database connection  
Inside `DatabaseHandler.java`, update:

```java
String url = "jdbc:mysql://localhost:3306/artify";
String user = "root";
String pass = "";
```

### 4. Deploy project  
Run on Tomcat or GlassFish.  
Open:

```
http://localhost:8080/Artify/index.html
```

---

## Future Enhancements
- Online payment integration  
- Admin dashboard  
- Artwork reviews  
- Wishlist system  
- Artwork search & filter  

---

## Contributors
| Name | Role |
|------|------|
| **Numaan Suhaff** | Backend, Checkout, Integration |
| **Parisa** | Frontend interface & design |
| **Leena** | Database schema & cart logic |

---


