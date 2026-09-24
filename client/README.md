# Shri Durga Puja Samiti Web Application

A full-stack web application designed for digital history maintenance, committee management, and financial transparency of village Durga Puja festivals.

## Key System Locations & Customization Guide

| Item / Configuration | File Path |
| :--- | :--- |
| **Home Page UI** | `client/src/pages/Home.jsx` |
| **Committee Section** | `client/src/pages/Committee.jsx` |
| **Financial Report Ledger** | `client/src/pages/FinancialReport.jsx` |
| **Admin Dashboard** | `client/src/pages/AdminDashboard.jsx` |
| **Village Name Setup** | `client/src/components/Navbar.jsx` & `Footer.jsx` |
| **Maa Durga Image Setup** | `client/src/pages/Home.jsx` |
| **MongoDB URI Connection** | `server/.env` (`MONGO_URI`) |
| **Cloudinary Setup** | `server/.env` (`CLOUDINARY_*`) |

---

## Step-by-Step Local Setup Instructions

### 1. Prerequisite Setup
Ensure Node.js (v18+) and MongoDB Server are installed and running locally.

### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env to adjust MONGO_URI and JWT_SECRET
npm run seed     # Populate 2026, 2025, 2024 demo data
npm run dev      # Server starts on http://localhost:5000