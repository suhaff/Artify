# 🎨 Artify — Online Art Marketplace

Artify is a full-stack online art marketplace where users can browse, purchase, and review artworks, while artists can register as sellers to upload, manage, and sell their own creations.  
The platform also includes administrative tools for moderation, complaints, and platform management.

This project was built as part of the **CAT201 Web Development Project**.

---

## 👥 Team Members

| Name | Role |
|------|------|
| **Numaan Suhaff** | Frontend & Backend Developer |
| **Leena** | UI/UX Design & Documentation |
| **Perisa** | System Analysis & Testing |

---

## 🚀 Features

### 👤 Buyer Features
- User registration & login (JWT based)
- Browse and search artworks
- Wishlist and cart system
- Secure checkout
- Order history
- Submit complaints and feedback

### 🧑‍🎨 Seller Features
- Request to become a seller
- Seller dashboard
- Upload & manage artworks
- View customer reviews
- Sales analytics
- Withdraw earnings

### 🛡️ Admin Features
- View and manage users
- View complaints
- Manage coupons
- Monitor system activity

---

## 🧰 Tech Stack

### Backend
- Java 17  
- Spring Boot 3  
- Spring Security (JWT)  
- Spring Data JPA  
- H2 Database  

### Frontend
- HTML5  
- CSS3  
- JavaScript  

### Database
- H2 (file-based)

---

## 📁 Project Structure

```
Artify/
│
├── backend/               → Spring Boot backend
│   ├── src/main/java      → Controllers, Models, Repositories
│   ├── src/main/resources → application.properties, schema
│
├── frontend/              → UI (HTML, CSS, JS)
│
├── database/              → SQL scripts
│
└── README.md
```

---

## 🔐 Authentication

Artify uses **JWT (JSON Web Tokens)** for secure login.

After login, the token is stored in:
```js
localStorage.getItem("token")
```

The token contains:
- Email
- User ID
- Role (BUYER, SELLER, ADMIN)

This is used to protect pages and dashboards.

---

## 🧑‍🎨 Seller System

Users can apply to become a seller.  
Once approved, their role changes to `SELLER` and they gain access to:

- Seller dashboard  
- Product management  
- Reviews  
- Analytics  
- Withdrawal page  

Seller pages:
```
seller-dashboard.html
seller-products.html
seller-reviews.html
seller-analytics.html
seller-withdraw.html
```

---

## 📊 Seller Analytics

The seller analytics page shows:
- Total orders
- Revenue
- Product performance
- Reviews
- Charts for visual insights  

(Currently uses demo data, ready for backend integration.)

---

## 🛡️ Admin Panel

Admins can:
- View users
- Review complaints
- Manage coupons
- Monitor platform activity  

Admin pages are located in:
```
frontend/admin/
```

---

## ▶️ How to Run

### Backend
```bash
cd backend
mvn spring-boot:run
```

Runs on:
```
http://localhost:8080
```

H2 Database Console:
```
http://localhost:8080/h2-console
```

---

### Frontend
Open any file inside:
```
frontend/
```
or
```
backend/src/main/resources/static
```

Example:
```
index.html
```

---

## 🏁 Conclusion

Artify is a modern, role-based online art marketplace that supports buyers, sellers, and administrators.  
The system is designed to be scalable, secure, and visually appealing, providing a complete e-commerce experience for digital art.

---

🎨 **Artify — Connecting Artists and Collectors**
