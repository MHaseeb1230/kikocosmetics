import pool from '../config/database.js';

// @desc    Get all products with filters
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const {
      category,
      subcategory,
      search,
      minPrice,
      maxPrice,
      featured,
      page = 1,
      limit = 20,
      sortBy = 'created_at',
      sortOrder = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    const conditions = ['p.is_active = true'];
    const values = [];
    let paramCount = 1;

    // Build WHERE clause
    if (category) {
      values.push(category);
      conditions.push(`c.slug = $${paramCount++}`);
    }

    if (subcategory) {
      values.push(subcategory);
      conditions.push(`sc.slug = $${paramCount++}`);
    }

    if (search) {
      values.push(`%${search}%`);
      conditions.push(`(p.name ILIKE $${paramCount} OR p.description ILIKE $${paramCount})`);
      paramCount++;
    }

    if (minPrice) {
      values.push(minPrice);
      conditions.push(`p.price >= $${paramCount++}`);
    }

    if (maxPrice) {
      values.push(maxPrice);
      conditions.push(`p.price <= $${paramCount++}`);
    }

    if (featured === 'true') {
      conditions.push('p.is_featured = true');
    }

    if (req.query.new === 'true') {
      // Get products from last 30 days
      conditions.push(`p.created_at >= CURRENT_TIMESTAMP - INTERVAL '30 days'`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Valid sort fields
    const validSortFields = {
      'created_at': 'p.created_at',
      'price': 'p.price',
      'name': 'p.name',
      'sales': 'p.sales_count'
    };

    const sortField = validSortFields[sortBy] || 'p.created_at';
    const sortDirection = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    // Get products
    values.push(limit, offset);
    const result = await pool.query(
      `SELECT 
        p.id, p.name, p.slug, p.description, p.price, p.original_price,
        p.discount_percentage, p.stock_quantity, p.image_url, p.sku,
        p.volume, p.spf, p.is_featured, p.views_count, p.sales_count,
        c.name as category_name, c.slug as category_slug,
        sc.name as subcategory_name, sc.slug as subcategory_slug,
        p.created_at
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN subcategories sc ON p.subcategory_id = sc.id
       ${whereClause}
       ORDER BY ${sortField} ${sortDirection}
       LIMIT $${paramCount++} OFFSET $${paramCount++}`,
      values
    );

    // Get total count
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN subcategories sc ON p.subcategory_id = sc.id
       ${whereClause}`,
      values.slice(0, -2)
    );

    res.json({
      success: true,
      data: {
        products: result.rows.map(p => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          description: p.description,
          price: parseFloat(p.price),
          originalPrice: p.original_price ? parseFloat(p.original_price) : null,
          discount: p.discount_percentage,
          inStock: p.stock_quantity > 0,
          stockQuantity: p.stock_quantity,
          image: p.image_url,
          sku: p.sku,
          volume: p.volume,
          spf: p.spf,
          isFeatured: p.is_featured,
          category: {
            name: p.category_name,
            slug: p.category_slug
          },
          subcategory: p.subcategory_name ? {
            name: p.subcategory_name,
            slug: p.subcategory_slug
          } : null,
          stats: {
            views: p.views_count,
            sales: p.sales_count
          }
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
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products'
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:slug
// @access  Public
export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Check if slug is a UUID (for backward compatibility)
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);

    // Get product by slug or ID
    const result = await pool.query(
      `SELECT 
        p.*,
        c.name as category_name, c.slug as category_slug,
        sc.name as subcategory_name, sc.slug as subcategory_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN subcategories sc ON p.subcategory_id = sc.id
       WHERE ${isUUID ? 'p.id = $1' : 'p.slug = $1'} AND p.is_active = true`,
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const product = result.rows[0];

    // Get product features
    const featuresResult = await pool.query(
      'SELECT title, description FROM product_features WHERE product_id = $1 ORDER BY display_order',
      [product.id]
    );

    // Get product ingredients
    const ingredientsResult = await pool.query(
      'SELECT ingredient_name FROM product_ingredients WHERE product_id = $1 ORDER BY display_order',
      [product.id]
    );

    // Get product swatches
    const swatchesResult = await pool.query(
      'SELECT color_hex, color_name FROM product_swatches WHERE product_id = $1 ORDER BY display_order',
      [product.id]
    );

    // Get additional images
    const imagesResult = await pool.query(
      'SELECT image_url FROM product_images WHERE product_id = $1 ORDER BY is_primary DESC, display_order',
      [product.id]
    );

    // Increment views count
    await pool.query(
      'UPDATE products SET views_count = views_count + 1 WHERE id = $1',
      [product.id]
    );

    res.json({
      success: true,
      data: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: parseFloat(product.price),
        originalPrice: product.original_price ? parseFloat(product.original_price) : null,
        discount: product.discount_percentage,
        inStock: product.stock_quantity > 0,
        stockQuantity: product.stock_quantity,
        image: product.image_url,
        images: imagesResult.rows.map(img => img.image_url),
        sku: product.sku,
        volume: product.volume,
        spf: product.spf,
        isFeatured: product.is_featured,
        category: {
          name: product.category_name,
          slug: product.category_slug
        },
        subcategory: product.subcategory_name ? {
          name: product.subcategory_name,
          slug: product.subcategory_slug
        } : null,
        features: featuresResult.rows,
        keyIngredients: ingredientsResult.rows.map(i => i.ingredient_name),
        swatches: swatchesResult.rows.map(s => s.color_hex),
        stats: {
          views: product.views_count + 1,
          sales: product.sales_count
        },
        createdAt: product.created_at
      }
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product'
    });
  }
};

// @desc    Get categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, slug, description, image_url
       FROM categories
       WHERE is_active = true
       ORDER BY display_order, name`
    );

    res.json({
      success: true,
      data: result.rows.map(cat => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: cat.image_url
      }))
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories'
    });
  }
};

// @desc    Get subcategories by category
// @route   GET /api/categories/:categorySlug/subcategories
// @access  Public
export const getSubcategories = async (req, res) => {
  try {
    const { categorySlug } = req.params;

    const result = await pool.query(
      `SELECT sc.id, sc.name, sc.slug, sc.description
       FROM subcategories sc
       JOIN categories c ON sc.category_id = c.id
       WHERE c.slug = $1 AND sc.is_active = true AND c.is_active = true
       ORDER BY sc.display_order, sc.name`,
      [categorySlug]
    );

    res.json({
      success: true,
      data: result.rows.map(sub => ({
        id: sub.id,
        name: sub.name,
        slug: sub.slug,
        description: sub.description
      }))
    });
  } catch (error) {
    console.error('Get subcategories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching subcategories'
    });
  }
};


