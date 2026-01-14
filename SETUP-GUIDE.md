# 🚀 Kiko Cosmetics - Complete PERN Stack Setup Guide

Complete setup guide for the Kiko Cosmetics E-commerce platform with full cart and order management system.

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Running the Application](#running-the-application)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

### Required Software:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** package manager
- **Git** (optional)

### Verify Installation:
```bash
node --version    # Should be v18+
npm --version     # Should be v9+
psql --version    # Should be v14+
```

---

## 🔙 Backend Setup

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

**Packages installed:**
- express - Web framework
- pg - PostgreSQL client
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- cors - CORS middleware
- dotenv - Environment variables
- express-validator - Request validation
- uuid - UUID generation

### Step 2: Configure Environment Variables

The `.env` file is already configured with default values. If you need to change database credentials or other settings:

**backend/.env:**
```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=kikocosmetics
DB_USER=postgres
DB_PASSWORD=postgres    # Change this to your PostgreSQL password

JWT_SECRET=kiko_cosmetics_secret_2024_change_this_in_production
JWT_EXPIRE=7d

FRONTEND_URL=http://localhost:5173
```

### Step 3: Setup PostgreSQL Database

#### Option A: Using psql Command Line
```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE kikocosmetics;

# Exit psql
\q
```

#### Option B: Using pgAdmin
1. Open pgAdmin
2. Right-click on "Databases"
3. Select "Create" → "Database"
4. Name: `kikocosmetics`
5. Click "Save"

### Step 4: Run Database Migrations

```bash
# Still in backend directory
npm run migrate
```

**This creates all necessary tables:**
- users, addresses
- categories, subcategories
- products, product_features, product_ingredients, product_swatches, product_images
- carts, cart_items
- orders, order_items, order_status_history
- wishlist, reviews

### Step 5: Seed Database (Optional but Recommended)

```bash
npm run seed
```

**This creates:**
- Admin user: `admin@kikocosmetics.com` / `admin123`
- Categories: Make Up, Skin Care, Accessories, Hair
- Subcategories for each category

### Step 6: Start Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

**Backend should be running on:** `http://localhost:5000`

**Test it:**
- Open browser: `http://localhost:5000`
- Health check: `http://localhost:5000/api/health`

---

## 🎨 Frontend Setup

### Step 1: Install Frontend Dependencies

```bash
cd ../frontend    # or: cd frontend (if in root)
npm install
```

### Step 2: Install Axios for API Calls

```bash
npm install axios
```

### Step 3: Configure Environment Variables

Create a `.env.local` file in the frontend directory:

**frontend/.env.local:**
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Start Frontend Development Server

```bash
npm run dev
```

**Frontend should be running on:** `http://localhost:5173`

---

## 🏃 Running the Application

### Complete Startup Process:

#### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```
✅ Backend running on `http://localhost:5000`

#### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```
✅ Frontend running on `http://localhost:5173`

### Access the Application:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/api/health

---

## 🧪 Testing

### Test Backend Endpoints:

#### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

#### 2. Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "03001234567"
  }'
```

#### 3. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### 4. Get Products
```bash
curl http://localhost:5000/api/products
```

### Test Frontend:

1. **Open browser:** http://localhost:5173
2. **Register/Login:** Try authentication
3. **Browse Products:** Check product listing
4. **Add to Cart:** Test cart functionality
5. **Checkout:** Complete an order

---

## 🔥 Quick Start Commands

### Full Stack Startup (2 Terminals):

**Terminal 1:**
```bash
cd backend && npm run dev
```

**Terminal 2:**
```bash
cd frontend && npm run dev
```

---

## 🐛 Troubleshooting

### Issue 1: "Cannot connect to database"

**Solution:**
```bash
# Check if PostgreSQL is running
# Windows:
services.msc    # Look for PostgreSQL service

# Mac:
brew services list

# Linux:
sudo systemctl status postgresql

# Start PostgreSQL if not running
# Windows: Start from Services
# Mac: brew services start postgresql
# Linux: sudo systemctl start postgresql
```

### Issue 2: "Port 5000 already in use"

**Solution 1 - Change Backend Port:**
Edit `backend/.env`:
```env
PORT=5001
```
Then update `frontend/.env.local`:
```env
VITE_API_URL=http://localhost:5001/api
```

**Solution 2 - Kill Process:**
```bash
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

### Issue 3: "Migration failed"

**Solution:**
```bash
# Drop and recreate database
psql -U postgres
DROP DATABASE kikocosmetics;
CREATE DATABASE kikocosmetics;
\q

# Run migration again
cd backend
npm run migrate
```

### Issue 4: "Module not found" errors

**Solution:**
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Issue 5: "CORS errors" in browser

**Solution:**
1. Check `backend/.env` has correct `FRONTEND_URL`
2. Check `frontend/.env.local` has correct `VITE_API_URL`
3. Restart both servers

### Issue 6: "Database authentication failed"

**Solution:**
Edit `backend/.env` with your PostgreSQL password:
```env
DB_USER=postgres
DB_PASSWORD=YOUR_ACTUAL_PASSWORD
```

---

## 📊 Database Schema Overview

### Users & Authentication:
- `users` - User accounts
- `addresses` - Shipping addresses

### Products:
- `categories` - Main categories
- `subcategories` - Product subcategories
- `products` - Product catalog
- `product_features` - Product features
- `product_ingredients` - Ingredients list
- `product_swatches` - Color swatches
- `product_images` - Additional images

### Shopping:
- `carts` - Shopping carts
- `cart_items` - Cart items
- `orders` - Customer orders
- `order_items` - Order line items
- `order_status_history` - Order tracking

### Additional:
- `wishlist` - User wishlists
- `reviews` - Product reviews

---

## 🔐 Default Admin Credentials

After running `npm run seed`:

**Email:** admin@kikocosmetics.com  
**Password:** admin123

⚠️ **Change this password immediately in production!**

---

## 📝 Project Structure

```
kikocosmetics/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth, validation, errors
│   ├── migrations/      # Database migrations
│   ├── routes/          # API routes
│   ├── .env             # Environment variables
│   ├── package.json
│   └── server.js        # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── assets/      # Images, icons
│   │   ├── components/  # React components
│   │   ├── config/      # API configuration
│   │   ├── context/     # React context
│   │   ├── data/        # Mock data (to be replaced)
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── styles/      # CSS styles
│   ├── .env.local       # Environment variables
│   ├── package.json
│   └── vite.config.js
│
└── SETUP-GUIDE.md       # This file
```

---

## 🚀 Production Deployment

### Backend:
1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Update database credentials
4. Enable HTTPS
5. Use PM2 for process management
6. Setup logging and monitoring

### Frontend:
1. Update `VITE_API_URL` to production backend
2. Build: `npm run build`
3. Deploy `dist` folder to hosting (Vercel, Netlify, etc.)

---

## 📚 API Documentation

### Base URL:
```
http://localhost:5000/api
```

### Endpoints:

#### Authentication (`/api/auth`)
- `POST /register` - Register user
- `POST /login` - Login user
- `GET /me` - Get current user
- `PUT /profile` - Update profile
- `PUT /change-password` - Change password

#### Products (`/api/products`)
- `GET /` - Get all products
- `GET /categories` - Get categories
- `GET /categories/:slug/subcategories` - Get subcategories
- `GET /:slug` - Get single product

#### Cart (`/api/cart`)
- `GET /` - Get cart
- `POST /items` - Add to cart
- `PUT /items/:id` - Update quantity
- `DELETE /items/:id` - Remove item
- `DELETE /` - Clear cart
- `POST /merge` - Merge guest cart

#### Orders (`/api/orders`)
- `POST /` - Create order
- `GET /` - Get user orders
- `GET /:id` - Get order details
- `PUT /:id/cancel` - Cancel order

---

## 💡 Next Steps

1. ✅ Setup complete backend
2. ✅ Setup complete frontend
3. ✅ Database migrations
4. ✅ Cart system
5. ✅ Order management
6. 🔜 Add products to database
7. 🔜 Test complete flow
8. 🔜 Deploy to production

---

## 📞 Support

For issues or questions:
1. Check this guide
2. Review backend/README.md
3. Check console logs (both backend and frontend)
4. Verify all environment variables

---

## ✅ Checklist

Before starting development, ensure:

- [ ] Node.js installed (v18+)
- [ ] PostgreSQL installed and running
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Axios installed in frontend
- [ ] Database created
- [ ] Migrations run successfully
- [ ] Database seeded
- [ ] Environment files configured
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can register/login users
- [ ] Can view products
- [ ] Cart functionality works
- [ ] Can place orders

---

**Happy Coding! 🎉**


