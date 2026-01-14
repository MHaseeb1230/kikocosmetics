import pool from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

// Helper function to get or create cart
const getOrCreateCart = async (userId, sessionId) => {
  let cart;

  if (userId) {
    // For logged-in users
    const result = await pool.query(
      'SELECT id FROM carts WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length > 0) {
      cart = result.rows[0];
    } else {
      const newCart = await pool.query(
        'INSERT INTO carts (user_id) VALUES ($1) RETURNING id',
        [userId]
      );
      cart = newCart.rows[0];
    }
  } else {
    // For guest users
    const result = await pool.query(
      'SELECT id FROM carts WHERE session_id = $1',
      [sessionId]
    );

    if (result.rows.length > 0) {
      cart = result.rows[0];
    } else {
      const newCart = await pool.query(
        'INSERT INTO carts (session_id) VALUES ($1) RETURNING id',
        [sessionId]
      );
      cart = newCart.rows[0];
    }
  }

  return cart.id;
};

// Helper function to get cart with items
const getCartWithItems = async (cartId) => {
  const result = await pool.query(
    `SELECT 
      ci.id,
      ci.quantity,
      ci.price,
      p.id as product_id,
      p.name as product_name,
      p.slug as product_slug,
      p.image_url,
      p.price as current_price,
      p.original_price,
      p.discount_percentage,
      p.stock_quantity
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.cart_id = $1 AND p.is_active = true
    ORDER BY ci.created_at DESC`,
    [cartId]
  );

  return result.rows;
};

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Public (with session)
export const getCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    const sessionId = req.headers['x-session-id'] || uuidv4();

    const cartId = await getOrCreateCart(userId, sessionId);
    const items = await getCartWithItems(cartId);

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    res.json({
      success: true,
      data: {
        cartId,
        sessionId: userId ? null : sessionId,
        items: items.map(item => ({
          id: item.id,
          productId: item.product_id,
          name: item.product_name,
          slug: item.product_slug,
          image: item.image_url,
          price: parseFloat(item.price),
          currentPrice: parseFloat(item.current_price),
          originalPrice: item.original_price ? parseFloat(item.original_price) : null,
          discount: item.discount_percentage,
          quantity: item.quantity,
          subtotal: parseFloat(item.price) * item.quantity,
          inStock: item.stock_quantity > 0,
          stockQuantity: item.stock_quantity
        })),
        summary: {
          subtotal: parseFloat(subtotal.toFixed(2)),
          totalItems,
          itemCount: items.length
        }
      }
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching cart',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/items
// @access  Public (with session)
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user?.id;
    const sessionId = req.headers['x-session-id'] || uuidv4();

    // Validate product exists and is active
    const productResult = await pool.query(
      'SELECT id, price, stock_quantity, is_active FROM products WHERE id = $1',
      [productId]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const product = productResult.rows[0];

    if (!product.is_active) {
      return res.status(400).json({
        success: false,
        message: 'Product is not available'
      });
    }

    if (product.stock_quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
    }

    // Get or create cart
    const cartId = await getOrCreateCart(userId, sessionId);

    // Check if item already exists in cart
    const existingItem = await pool.query(
      'SELECT id, quantity FROM cart_items WHERE cart_id = $1 AND product_id = $2',
      [cartId, productId]
    );

    if (existingItem.rows.length > 0) {
      // Update quantity
      const newQuantity = existingItem.rows[0].quantity + quantity;

      if (product.stock_quantity < newQuantity) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient stock for requested quantity'
        });
      }

      await pool.query(
        'UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [newQuantity, existingItem.rows[0].id]
      );
    } else {
      // Add new item
      await pool.query(
        'INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [cartId, productId, quantity, product.price]
      );
    }

    // Get updated cart
    const items = await getCartWithItems(cartId);
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    res.json({
      success: true,
      message: 'Item added to cart successfully',
      data: {
        cartId,
        sessionId: userId ? null : sessionId,
        summary: {
          subtotal: parseFloat(subtotal.toFixed(2)),
          totalItems,
          itemCount: items.length
        }
      }
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding item to cart'
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/items/:itemId
// @access  Public (with session)
export const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const userId = req.user?.id;
    const sessionId = req.headers['x-session-id'];

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    // Get cart item with product info
    const itemResult = await pool.query(
      `SELECT ci.*, c.user_id, c.session_id, p.stock_quantity
       FROM cart_items ci
       JOIN carts c ON ci.cart_id = c.id
       JOIN products p ON ci.product_id = p.id
       WHERE ci.id = $1`,
      [itemId]
    );

    if (itemResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    const item = itemResult.rows[0];

    // Verify ownership
    if (userId && item.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    if (!userId && item.session_id !== sessionId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // Check stock
    if (item.stock_quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
    }

    // Update quantity
    await pool.query(
      'UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [quantity, itemId]
    );

    res.json({
      success: true,
      message: 'Cart item updated successfully'
    });
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating cart item'
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/items/:itemId
// @access  Public (with session)
export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user?.id;
    const sessionId = req.headers['x-session-id'];

    // Get cart item
    const itemResult = await pool.query(
      `SELECT ci.*, c.user_id, c.session_id
       FROM cart_items ci
       JOIN carts c ON ci.cart_id = c.id
       WHERE ci.id = $1`,
      [itemId]
    );

    if (itemResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    const item = itemResult.rows[0];

    // Verify ownership
    if (userId && item.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    if (!userId && item.session_id !== sessionId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // Delete item
    await pool.query('DELETE FROM cart_items WHERE id = $1', [itemId]);

    res.json({
      success: true,
      message: 'Item removed from cart'
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing item from cart'
    });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Public (with session)
export const clearCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    const sessionId = req.headers['x-session-id'];

    const cartResult = await pool.query(
      'SELECT id FROM carts WHERE user_id = $1 OR session_id = $2',
      [userId, sessionId]
    );

    if (cartResult.rows.length === 0) {
      return res.json({
        success: true,
        message: 'Cart is already empty'
      });
    }

    await pool.query('DELETE FROM cart_items WHERE cart_id = $1', [cartResult.rows[0].id]);

    res.json({
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error clearing cart'
    });
  }
};

// @desc    Merge guest cart with user cart after login
// @route   POST /api/cart/merge
// @access  Private
export const mergeCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }

    // Get guest cart
    const guestCartResult = await pool.query(
      'SELECT id FROM carts WHERE session_id = $1',
      [sessionId]
    );

    if (guestCartResult.rows.length === 0) {
      return res.json({
        success: true,
        message: 'No guest cart to merge'
      });
    }

    const guestCartId = guestCartResult.rows[0].id;

    // Get or create user cart
    const userCartId = await getOrCreateCart(userId, null);

    // Get guest cart items
    const guestItems = await pool.query(
      'SELECT product_id, quantity, price FROM cart_items WHERE cart_id = $1',
      [guestCartId]
    );

    // Merge items
    for (const item of guestItems.rows) {
      const existingItem = await pool.query(
        'SELECT id, quantity FROM cart_items WHERE cart_id = $1 AND product_id = $2',
        [userCartId, item.product_id]
      );

      if (existingItem.rows.length > 0) {
        // Update quantity
        await pool.query(
          'UPDATE cart_items SET quantity = quantity + $1 WHERE id = $2',
          [item.quantity, existingItem.rows[0].id]
        );
      } else {
        // Add new item
        await pool.query(
          'INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
          [userCartId, item.product_id, item.quantity, item.price]
        );
      }
    }

    // Delete guest cart
    await pool.query('DELETE FROM carts WHERE id = $1', [guestCartId]);

    res.json({
      success: true,
      message: 'Cart merged successfully'
    });
  } catch (error) {
    console.error('Merge cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error merging cart'
    });
  }
};


