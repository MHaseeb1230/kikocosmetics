# Kiko Cosmetics Backend API

Complete PERN Stack Backend for Kiko Cosmetics E-commerce Platform

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # Database connection & configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── cartController.js    # Cart management logic
│   ├── orderController.js   # Order processing logic
│   └── productController.js # Product management logic
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   ├── errorHandler.js      # Global error handling
│   └── validation.js        # Request validation
├── migrations/
│   ├── 001_create_tables.sql # Database schema
│   ├── migrate.js           # Migration runner
│   └── seed.js              # Database seeder
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── cartRoutes.js        # Cart endpoints
│   ├── orderRoutes.js       # Order endpoints
│   └── productRoutes.js     # Product endpoints
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
├── README.md
└── server.js                # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Setup environment variables:**
   - Copy `.env.example` to `.env`
   - Update the values in `.env`:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=kikocosmetics
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

FRONTEND_URL=http://localhost:5173
```

3. **Create PostgreSQL database:**
```bash
psql -U postgres
CREATE DATABASE kikocosmetics;
\q
```

4. **Run migrations:**
```bash
npm run migrate
```

5. **Seed database (optional):**
```bash
npm run seed
```

This will create:
- Admin user: `admin@kikocosmetics.com` / `admin123`
- Categories and subcategories

6. **Start development server:**
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## 📊 Database Schema

### Main Tables:
- **users** - User accounts
- **addresses** - User addresses
- **categories** - Product categories
- **subcategories** - Product subcategories
- **products** - Product catalog
- **product_features** - Product features
- **product_ingredients** - Product ingredients
- **product_swatches** - Product color swatches
- **product_images** - Additional product images
- **carts** - Shopping carts
- **cart_items** - Cart items
- **orders** - Customer orders
- **order_items** - Order line items
- **order_status_history** - Order status tracking
- **wishlist** - User wishlists
- **reviews** - Product reviews

## 🔌 API Endpoints

### Authentication (`/api/auth`)
```
POST   /register           - Register new user
POST   /login              - Login user
GET    /me                 - Get current user
PUT    /profile            - Update profile
PUT    /change-password    - Change password
```

### Products (`/api/products`)
```
GET    /                   - Get all products (with filters)
GET    /categories         - Get all categories
GET    /categories/:slug/subcategories - Get subcategories
GET    /:slug              - Get single product
```

### Cart (`/api/cart`)
```
GET    /                   - Get cart
POST   /items              - Add item to cart
PUT    /items/:itemId      - Update cart item quantity
DELETE /items/:itemId      - Remove item from cart
DELETE /                   - Clear cart
POST   /merge              - Merge guest cart with user cart
```

### Orders (`/api/orders`)
```
POST   /                   - Create new order
GET    /                   - Get user's orders
GET    /:id                - Get order details
PUT    /:id/cancel         - Cancel order
PUT    /:id/status         - Update order status (Admin)
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Getting a token:
```javascript
// Login request
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Using the token:
```javascript
// Include in Authorization header
Authorization: Bearer <your_token_here>
```

## 🛒 Cart System

The cart system supports both:
- **Guest users** - using session ID
- **Authenticated users** - using user ID

### Guest Cart:
```javascript
// Include session ID in header
X-Session-ID: <uuid_session_id>
```

### Merging Carts:
When a guest user logs in, their cart can be merged:
```javascript
POST /api/cart/merge
{
  "sessionId": "guest-session-id"
}
```

## 📦 Order Processing

### Order Flow:
1. **pending** - Order created
2. **confirmed** - Order confirmed by admin
3. **processing** - Order being prepared
4. **shipped** - Order shipped
5. **delivered** - Order delivered
6. **cancelled** - Order cancelled
7. **refunded** - Order refunded

### Payment Methods:
- COD (Cash on Delivery)
- Card
- Bank Transfer
- Wallet

## 🔧 NPM Scripts

```bash
npm start              # Start production server
npm run dev            # Start development server with nodemon
npm run migrate        # Run database migrations
npm run migrate:rollback # Rollback migrations (if implemented)
npm run seed           # Seed database with initial data
```

## 🐛 Error Handling

All API responses follow a consistent format:

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ]
}
```

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Input validation with express-validator
- SQL injection prevention with parameterized queries
- CORS protection
- Rate limiting ready
- Environment variables for sensitive data

## 📝 Development Notes

### Adding New Products:
Products should be added through the database directly or via an admin panel (to be implemented). Each product can have:
- Features (title + description)
- Ingredients (list)
- Swatches (color codes)
- Additional images

### Stock Management:
- Stock is automatically decreased when orders are placed
- Stock is restored when orders are cancelled
- Products with 0 stock can still be viewed but marked as "Out of Stock"

## 🚀 Production Deployment

### Environment Variables:
Make sure to update:
- `NODE_ENV=production`
- `JWT_SECRET` - Use a strong, random secret
- Database credentials
- `FRONTEND_URL` - Your production frontend URL

### Database:
- Use connection pooling (already configured)
- Regular backups recommended
- Consider using managed PostgreSQL (e.g., AWS RDS, Heroku Postgres)

### Server:
- Use PM2 or similar for process management
- Enable logging
- Set up monitoring
- Configure reverse proxy (Nginx)

## 📞 Support

For issues or questions, please contact the development team.

## 📄 License

Proprietary - All rights reserved





