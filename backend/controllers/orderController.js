import pool from '../config/database.js';

// Generate unique order number
const generateOrderNumber = () => {
  const prefix = 'KK';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Public (with session) / Private
export const createOrder = async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    const {
      items,
      shippingAddress,
      paymentMethod = 'cod',
      customerNotes
    } = req.body;

    const userId = req.user?.id;

    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Validate shipping address
    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.phone || 
        !shippingAddress.addressLine1 || !shippingAddress.city) {
      return res.status(400).json({
        success: false,
        message: 'Complete shipping address is required'
      });
    }

    // Calculate totals and verify products
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const productResult = await client.query(
        'SELECT id, name, slug, price, stock_quantity, image_url, sku FROM products WHERE id = $1 AND is_active = true',
        [item.productId]
      );

      if (productResult.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(400).json({
          success: false,
          message: `Product ${item.productId} not found or not available`
        });
      }

      const product = productResult.rows[0];

      if (product.stock_quantity < item.quantity) {
        await client.query('ROLLBACK');
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`
        });
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: product.id,
        productName: product.name,
        productSku: product.sku,
        productImage: product.image_url,
        quantity: item.quantity,
        unitPrice: product.price,
        totalPrice: itemTotal
      });
    }

    // Calculate shipping (flat rate for now)
    const shippingCost = subtotal >= 5000 ? 0 : 250; // Free shipping above PKR 5000
    const tax = 0; // No tax for now
    const discount = 0; // No discount for now
    const totalAmount = subtotal + shippingCost + tax - discount;

    // Generate order number
    const orderNumber = generateOrderNumber();

    // Create order
    const orderResult = await client.query(
      `INSERT INTO orders (
        order_number, user_id, customer_name, customer_email, customer_phone,
        shipping_address_line1, shipping_address_line2, shipping_city, 
        shipping_state, shipping_postal_code, shipping_country,
        subtotal, shipping_cost, tax, discount, total_amount,
        payment_method, customer_notes, status, payment_status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
      RETURNING id, order_number, created_at`,
      [
        orderNumber,
        userId,
        shippingAddress.fullName,
        shippingAddress.email || req.user?.email || '',
        shippingAddress.phone,
        shippingAddress.addressLine1,
        shippingAddress.addressLine2 || null,
        shippingAddress.city,
        shippingAddress.state || null,
        shippingAddress.postalCode || null,
        shippingAddress.country || 'Pakistan',
        subtotal,
        shippingCost,
        tax,
        discount,
        totalAmount,
        paymentMethod,
        customerNotes || null,
        'pending',
        paymentMethod === 'cod' ? 'pending' : 'pending'
      ]
    );

    const order = orderResult.rows[0];

    // Insert order items
    for (const item of orderItems) {
      await client.query(
        `INSERT INTO order_items (
          order_id, product_id, product_name, product_sku, product_image,
          quantity, unit_price, total_price
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          order.id,
          item.productId,
          item.productName,
          item.productSku,
          item.productImage,
          item.quantity,
          item.unitPrice,
          item.totalPrice
        ]
      );

      // Update product stock
      await client.query(
        'UPDATE products SET stock_quantity = stock_quantity - $1, sales_count = sales_count + $2 WHERE id = $3',
        [item.quantity, item.quantity, item.productId]
      );
    }

    // Create order status history
    await client.query(
      `INSERT INTO order_status_history (order_id, new_status, changed_by, notes)
       VALUES ($1, $2, $3, $4)`,
      [order.id, 'pending', userId, 'Order created']
    );

    // Clear user's cart if logged in
    if (userId) {
      const cartResult = await client.query(
        'SELECT id FROM carts WHERE user_id = $1',
        [userId]
      );
      if (cartResult.rows.length > 0) {
        await client.query('DELETE FROM cart_items WHERE cart_id = $1', [cartResult.rows[0].id]);
      }
    }

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: {
        orderId: order.id,
        orderNumber: order.order_number,
        totalAmount,
        createdAt: order.created_at
      }
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order'
    });
  } finally {
    client.release();
  }
};

// @desc    Get user's orders
// @route   GET /api/orders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const result = await pool.query(
      `SELECT 
        id, order_number, total_amount, status, payment_status, 
        payment_method, created_at
       FROM orders
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [req.user.id, limit, offset]
    );

    const countResult = await pool.query(
      'SELECT COUNT(*) FROM orders WHERE user_id = $1',
      [req.user.id]
    );

    res.json({
      success: true,
      data: {
        orders: result.rows.map(order => ({
          id: order.id,
          orderNumber: order.order_number,
          totalAmount: parseFloat(order.total_amount),
          status: order.status,
          paymentStatus: order.payment_status,
          paymentMethod: order.payment_method,
          createdAt: order.created_at
        })),
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: parseInt(countResult.rows[0].count),
          pages: Math.ceil(countResult.rows[0].count / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders'
    });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private / Public (with order number)
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    // Get order
    const orderResult = await pool.query(
      `SELECT * FROM orders WHERE id = $1`,
      [id]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const order = orderResult.rows[0];

    // Check authorization (user must own the order or be admin)
    if (userId && order.user_id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order'
      });
    }

    // Get order items
    const itemsResult = await pool.query(
      `SELECT * FROM order_items WHERE order_id = $1 ORDER BY created_at`,
      [id]
    );

    res.json({
      success: true,
      data: {
        order: {
          id: order.id,
          orderNumber: order.order_number,
          status: order.status,
          paymentStatus: order.payment_status,
          paymentMethod: order.payment_method,
          customer: {
            name: order.customer_name,
            email: order.customer_email,
            phone: order.customer_phone
          },
          shippingAddress: {
            addressLine1: order.shipping_address_line1,
            addressLine2: order.shipping_address_line2,
            city: order.shipping_city,
            state: order.shipping_state,
            postalCode: order.shipping_postal_code,
            country: order.shipping_country
          },
          items: itemsResult.rows.map(item => ({
            id: item.id,
            productId: item.product_id,
            productName: item.product_name,
            productSku: item.product_sku,
            productImage: item.product_image,
            quantity: item.quantity,
            unitPrice: parseFloat(item.unit_price),
            totalPrice: parseFloat(item.total_price)
          })),
          pricing: {
            subtotal: parseFloat(order.subtotal),
            shippingCost: parseFloat(order.shipping_cost),
            tax: parseFloat(order.tax),
            discount: parseFloat(order.discount),
            totalAmount: parseFloat(order.total_amount)
          },
          notes: {
            customer: order.customer_notes,
            admin: order.admin_notes
          },
          timestamps: {
            createdAt: order.created_at,
            confirmedAt: order.confirmed_at,
            shippedAt: order.shipped_at,
            deliveredAt: order.delivered_at,
            cancelledAt: order.cancelled_at
          }
        }
      }
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order'
    });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    const { id } = req.params;
    const { reason } = req.body;

    // Get order
    const orderResult = await client.query(
      'SELECT * FROM orders WHERE id = $1',
      [id]
    );

    if (orderResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const order = orderResult.rows[0];

    // Check authorization
    if (order.user_id !== req.user.id && req.user.role !== 'admin') {
      await client.query('ROLLBACK');
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // Check if order can be cancelled
    if (['shipped', 'delivered', 'cancelled'].includes(order.status)) {
      await client.query('ROLLBACK');
      return res.status(400).json({
        success: false,
        message: `Cannot cancel order with status: ${order.status}`
      });
    }

    // Restore product stock
    const itemsResult = await client.query(
      'SELECT product_id, quantity FROM order_items WHERE order_id = $1',
      [id]
    );

    for (const item of itemsResult.rows) {
      await client.query(
        'UPDATE products SET stock_quantity = stock_quantity + $1, sales_count = sales_count - $2 WHERE id = $3',
        [item.quantity, item.quantity, item.product_id]
      );
    }

    // Update order status
    await client.query(
      `UPDATE orders 
       SET status = 'cancelled', 
           cancelled_at = CURRENT_TIMESTAMP,
           admin_notes = COALESCE(admin_notes || E'\n', '') || $1
       WHERE id = $2`,
      [`Cancelled by ${req.user.role}: ${reason || 'No reason provided'}`, id]
    );

    // Add to status history
    await client.query(
      `INSERT INTO order_status_history (order_id, old_status, new_status, changed_by, notes)
       VALUES ($1, $2, 'cancelled', $3, $4)`,
      [id, order.status, req.user.id, reason]
    );

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Order cancelled successfully'
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling order'
    });
  } finally {
    client.release();
  }
};

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id/status
// @access  Private (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    // Get current order
    const orderResult = await pool.query('SELECT status FROM orders WHERE id = $1', [id]);
    
    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const oldStatus = orderResult.rows[0].status;

    // Update order
    const updateFields = ['status = $1'];
    const values = [status, id];
    let paramCount = 2;

    if (status === 'confirmed') {
      updateFields.push(`confirmed_at = CURRENT_TIMESTAMP`);
    } else if (status === 'shipped') {
      updateFields.push(`shipped_at = CURRENT_TIMESTAMP`);
    } else if (status === 'delivered') {
      updateFields.push(`delivered_at = CURRENT_TIMESTAMP`);
      updateFields.push(`payment_status = 'paid'`);
    } else if (status === 'cancelled') {
      updateFields.push(`cancelled_at = CURRENT_TIMESTAMP`);
    }

    await pool.query(
      `UPDATE orders SET ${updateFields.join(', ')} WHERE id = $${paramCount}`,
      values
    );

    // Add to status history
    await pool.query(
      `INSERT INTO order_status_history (order_id, old_status, new_status, changed_by, notes)
       VALUES ($1, $2, $3, $4, $5)`,
      [id, oldStatus, status, req.user.id, notes]
    );

    res.json({
      success: true,
      message: 'Order status updated successfully'
    });

  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order status'
    });
  }
};


