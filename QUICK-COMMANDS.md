# ⚡ Quick Commands Reference

## 🚀 Initial Setup (One Time Only)

### Backend Setup:
```bash
# 1. Install dependencies
cd backend
npm install

# 2. Create PostgreSQL database
psql -U postgres
CREATE DATABASE kikocosmetics;
\q

# 3. Run migrations
npm run migrate

# 4. Seed database (optional)
npm run seed
```

### Frontend Setup:
```bash
# 1. Install dependencies
cd frontend
npm install

# 2. Install axios
npm install axios

# 3. Create .env.local file
echo "VITE_API_URL=http://localhost:5000/api" > .env.local
```

---

## 🏃 Daily Development Commands

### Start Both Servers (Use 2 Terminals):

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Frontend: http://localhost:5173

---

## 🔧 Backend Commands

```bash
cd backend

# Development (with auto-reload)
npm run dev

# Production
npm start

# Run migrations
npm run migrate

# Seed database
npm run seed

# Import products (if needed)
node migrations/import_products.js
```

---

## 🎨 Frontend Commands

```bash
cd frontend

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 🗄️ Database Commands

### PostgreSQL:

```bash
# Login to PostgreSQL
psql -U postgres

# Switch to database
\c kikocosmetics

# List all tables
\dt

# View table structure
\d table_name

# View all users
SELECT * FROM users;

# View all products
SELECT id, name, price FROM products;

# View all orders
SELECT order_number, total_amount, status FROM orders;

# Drop database (⚠️ Careful!)
DROP DATABASE kikocosmetics;

# Create database
CREATE DATABASE kikocosmetics;

# Exit psql
\q
```

---

## 🧪 Testing Commands

### Test Backend Health:
```bash
curl http://localhost:5000/api/health
```

### Test Registration:
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

### Test Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Get Products:
```bash
curl http://localhost:5000/api/products
```

### Test Get Cart:
```bash
curl http://localhost:5000/api/cart \
  -H "X-Session-ID: test-session-123"
```

---

## 🔄 Reset Commands

### Reset Database:
```bash
cd backend

# Method 1: Drop and recreate
psql -U postgres
DROP DATABASE kikocosmetics;
CREATE DATABASE kikocosmetics;
\q

# Then run migrations again
npm run migrate
npm run seed

# Method 2: Clear all data (keeps structure)
psql -U postgres -d kikocosmetics -c "TRUNCATE users, addresses, categories, subcategories, products, product_features, product_ingredients, product_swatches, product_images, carts, cart_items, orders, order_items, order_status_history, wishlist, reviews CASCADE;"
```

### Reset Frontend Build:
```bash
cd frontend
rm -rf dist
npm run build
```

### Clear Node Modules (if issues):
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

---

## 🐛 Troubleshooting Commands

### Check if Port is in Use:

**Windows:**
```bash
# Check port 5000
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
# Check port 5000
lsof -ti:5000

# Kill process
lsof -ti:5000 | xargs kill -9
```

### Check PostgreSQL Status:

**Windows:**
```bash
# Check service
services.msc
# Look for PostgreSQL service
```

**Mac:**
```bash
# Check status
brew services list

# Start PostgreSQL
brew services start postgresql@14

# Stop PostgreSQL
brew services stop postgresql@14
```

**Linux:**
```bash
# Check status
sudo systemctl status postgresql

# Start PostgreSQL
sudo systemctl start postgresql

# Stop PostgreSQL
sudo systemctl stop postgresql

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### View Backend Logs:
```bash
cd backend
npm run dev | tee logs.txt
```

### View Frontend Logs:
```bash
cd frontend
npm run dev | tee logs.txt
```

---

## 📊 Database Query Examples

```sql
-- Get all products with categories
SELECT p.name, c.name as category, sc.name as subcategory, p.price
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN subcategories sc ON p.subcategory_id = sc.id;

-- Get all orders with user info
SELECT o.order_number, u.full_name, o.total_amount, o.status
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
ORDER BY o.created_at DESC;

-- Get cart items with product info
SELECT ci.quantity, p.name, p.price
FROM cart_items ci
JOIN products p ON ci.product_id = p.id
WHERE ci.cart_id = 'your-cart-id';

-- Get order items for a specific order
SELECT oi.product_name, oi.quantity, oi.unit_price, oi.total_price
FROM order_items oi
WHERE oi.order_id = 'your-order-id';

-- Get top selling products
SELECT name, sales_count, price
FROM products
ORDER BY sales_count DESC
LIMIT 10;

-- Get low stock products
SELECT name, stock_quantity
FROM products
WHERE stock_quantity < 10
ORDER BY stock_quantity;
```

---

## 🔐 Default Credentials

After running `npm run seed`:

**Admin Account:**
```
Email: admin@kikocosmetics.com
Password: admin123
```

---

## 📦 Quick NPM Commands

```bash
# Install all dependencies
npm install

# Install specific package
npm install package-name

# Install dev dependency
npm install -D package-name

# Update all packages
npm update

# Check for outdated packages
npm outdated

# View installed packages
npm list --depth=0

# Clear npm cache
npm cache clean --force
```

---

## 🚀 Deployment Commands

### Build Frontend:
```bash
cd frontend
npm run build
# Output in dist/ folder
```

### Production Backend:
```bash
cd backend
NODE_ENV=production npm start
```

---

## 📝 Git Commands (if using version control)

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Complete PERN stack implementation"

# Add remote
git remote add origin your-repo-url

# Push
git push -u origin main

# Create .gitignore (if not exists)
echo "node_modules/
.env
.env.local
dist/
*.log" > .gitignore
```

---

## 🎯 Common Workflows

### Fresh Start:
```bash
# 1. Backend
cd backend
rm -rf node_modules package-lock.json
npm install
npm run migrate
npm run seed
npm run dev

# 2. Frontend (in new terminal)
cd frontend
rm -rf node_modules package-lock.json
npm install
npm install axios
echo "VITE_API_URL=http://localhost:5000/api" > .env.local
npm run dev
```

### Update Environment Variables:
```bash
# Backend: Edit backend/.env
# Frontend: Edit frontend/.env.local
# Then restart both servers
```

### Add New Product:
```sql
-- Connect to database
psql -U postgres -d kikocosmetics

-- Insert product
INSERT INTO products (name, slug, description, category_id, price, stock_quantity, is_active)
VALUES ('Product Name', 'product-name', 'Description', 'category-id', 2990, 50, true);
```

---

## 🔥 Emergency Commands

### Kill All Node Processes:
```bash
# Windows
taskkill /F /IM node.exe

# Mac/Linux
killall node
```

### Reset Everything:
```bash
# 1. Kill all servers
# 2. Drop database
psql -U postgres -c "DROP DATABASE kikocosmetics;"
psql -U postgres -c "CREATE DATABASE kikocosmetics;"

# 3. Backend
cd backend
rm -rf node_modules
npm install
npm run migrate
npm run seed

# 4. Frontend
cd frontend
rm -rf node_modules dist
npm install
npm install axios

# 5. Restart servers
```

---

## 📚 Useful Links

- Backend: http://localhost:5000
- Frontend: http://localhost:5173
- API Health: http://localhost:5000/api/health
- API Base: http://localhost:5000/api

---

**💡 Tip:** Bookmark this file for quick reference during development!





