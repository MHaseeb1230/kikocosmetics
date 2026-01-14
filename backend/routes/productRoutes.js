import express from 'express';
import {
  getProducts,
  getProductBySlug,
  getCategories,
  getSubcategories
} from '../controllers/productController.js';

const router = express.Router();

// Product routes
router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/categories/:categorySlug/subcategories', getSubcategories);
router.get('/:slug', getProductBySlug);

export default router;


