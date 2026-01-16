import express from 'express';
import { body } from 'express-validator';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  mergeCart
} from '../controllers/cartController.js';
import { optionalAuth, protect } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

// Validation rules
const addToCartValidation = [
  body('productId').isUUID().withMessage('Valid product ID is required'),
  body('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1')
];

const updateCartValidation = [
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1')
];

// Routes (optionalAuth allows both guest and logged-in users)
router.get('/', optionalAuth, getCart);
router.post('/items', optionalAuth, addToCartValidation, validate, addToCart);
router.put('/items/:itemId', optionalAuth, updateCartValidation, validate, updateCartItem);
router.delete('/items/:itemId', optionalAuth, removeFromCart);
router.delete('/', optionalAuth, clearCart);

// Merge cart (requires authentication)
router.post('/merge', protect, mergeCart);

export default router;





