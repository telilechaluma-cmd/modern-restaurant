# TALILE Restaurant & Lounge - PHP Backend

This directory contains the complete PHP backend API and MySQL database for the **TALILE Modern Restaurant** website.

## 📁 Directory Structure
```
backend/
├── config/
│   └── db.php              # Database connection (PDO, CORS, JSON helpers)
├── database/
│   └── schema.sql          # Complete MySQL database schema & sample data
├── api/
│   ├── reservations.php    # VIP Table Reservations API (POST, GET, PUT)
│   ├── orders.php          # Online Food Orders & Tracking API (POST, GET, PUT)
│   ├── menu.php            # Food Menu Items & Categories API (CRUD)
│   ├── auth.php            # Admin Login & Authentication API
│   └── contact.php         # Customer Inquiries & Contact API
└── index.php               # API Status & Route Index
```

---

## 🚀 How to Run with XAMPP / WAMP / Apache

1. **Import Database:**
   - Open **phpMyAdmin** (`http://localhost/phpmyadmin`).
   - Create a new database named `talile_restaurant` (or import directly from `backend/database/schema.sql`).
   - Click **Import** and select `backend/database/schema.sql`.

2. **Database Credentials:**
   - In `backend/config/db.php`, adjust `DB_HOST`, `DB_USER`, `DB_PASS`, and `DB_NAME` if needed (Default: `localhost`, user: `root`, no password).

3. **Running the API:**
   - If using XAMPP/WAMP, copy or symlink this project to `C:/xampp/htdocs/Modern Restaurant`.
   - Or start PHP's built-in development server from terminal:
     ```bash
     cd "c:\Users\Administrator\Desktop\Modern Restaurant"
     php -S localhost:8000
     ```

4. **Test Endpoints:**
   - Check status: `http://localhost:8000/backend/index.php`
   - List Menu: `http://localhost:8000/backend/api/menu.php`
   - Table Reservations: `http://localhost:8000/backend/api/reservations.php`
   - Orders: `http://localhost:8000/backend/api/orders.php`

---

## 👑 Default Admin Credentials
- **Email:** `admin@talile.com`
- **Password:** `admin123`
