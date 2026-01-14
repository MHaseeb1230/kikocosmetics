import express from 'express';
import { body } from 'express-validator';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  updateOrderStatus
} from '../controllers/orderController.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

// Validation rules
const createOrderValidation = [
  body('items').isArray({ min: 1 }).withMessage('Order must have at least one item'),
  body('items.*.productId').isUUID().withMessage('Valid product ID is required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('shippingAddress.fullName').trim().notEmpty().withMessage('Full name is required'),
  body('shippingAddress.phone').trim().notEmpty().withMessage('Phone is required'),
  body('shippingAddress.addressLine1').trim().notEmpty().withMessage('Address is required'),
  body('shippingAddress.city').trim().notEmpty().withMessage('City is required'),
  body('paymentMethod')
    .optional()
    .isIn(['cod', 'card', 'bank_transfer', 'wallet'])
    .withMessage('Invalid payment method')
];

const updateOrderStatusValidation = [
  body('status')
    .isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'])
    .withMessage('Invalid status'),
  body('notes').optional().trim()
];

// Routes
router.post('/', optionalAuth, createOrderValidation, validate, createOrder);
router.get('/', protect, getMyOrders);
router.get('/:id', optionalAuth, getOrderById);
router.put('/:id/cancel', protect, cancelOrder);

// Admin routes
router.put('/:id/status', protect, authorize('admin'), updateOrderStatusValidation, validate, updateOrderStatus);

export default router;


