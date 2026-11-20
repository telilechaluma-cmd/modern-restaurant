# 🍽️ TALILE - Modern Restaurant & Online Food Ordering Platform

A modern, high-performance, responsive full-stack restaurant and food ordering application built with **React**, **TypeScript**, **Tailwind CSS**, and **Supabase**. Tailored for Ethiopian hospitality with local payment options (Telebirr, CBE Birr, Cash on Delivery), multilingual localization (Afaan Oromoo, Amharic, English), real-time order tracking, and an administrative control portal.

---

## ✨ Features

- **🎨 Modern Luxury UI/UX**: Warm aesthetic with forest green, warm berbere orange, and cream ivory colors. Fully responsive across smartphones, tablets, and desktops.
- **🌍 Multilingual Localization**: Instant switching between **Afaan Oromoo**, **Amharic (አማርኛ)**, and **English**.
- **🍛 Authentic Cuisine Photography**: Accurate, high-resolution photography for traditional dishes (Shekla Tibs, Gurage Kitfo, Fasting Beyaynetu, Royal Doro Wat, Shiro Tegabino, Chechebsa, Ful, Traditional Coffee Ceremony).
- **🛒 Dynamic Cart & Checkout**:
  - Add/remove items with customizable portion sizes and spice levels.
  - Sub-city delivery fee calculation across Addis Ababa zones.
  - Promotional coupon discounts (`TALILE10`).
- **💳 Verified Local Payment Options**:
  - **Telebirr**: Merchant code payment flow with verification.
  - **CBE Birr / Mobile Banking**: Direct account transfer flow with transaction confirmation.
  - **Cash on Delivery (COD)** / Bole Pickup.
- **📍 Live Order Progression Tracker**: 6-stage delivery progression tracker with driver contact and interactive map simulation.
- **📅 VIP Table Reservations**: Reserve private dining tables with date, time, and WhatsApp confirmation.
- **🔐 Staff Admin Dashboard**:
  - Manage menu items (create, update prices, change availability).
  - Manage categories and restaurant operational settings.
  - Real-time order monitoring and status updates.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React Icons
- **Build Tool**: Vite 6
- **Database & Auth**: Supabase (with fallback to client storage engine)
- **Effects**: Canvas Confetti, CSS Glassmorphism

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or newer)
- npm or yarn

### Installation

1. Clone repository:
   ```bash
   git clone https://github.com/your-username/talile-restaurant.git
   cd talile-restaurant
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) (or default Vite port) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

---

## 📄 License

This project is licensed under the MIT License.
