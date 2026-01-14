-- Manual Product Addition Guide
-- Use this template to add products manually via SQL or create an admin interface

-- Step 1: Get category and subcategory IDs
-- SELECT id, name, slug FROM categories;
-- SELECT id, name, slug FROM subcategories;

-- Step 2: Insert product (replace values with your product data)
INSERT INTO products (
    name,
    slug,
    description,
    category_id,
    subcategory_id,
    price,
    original_price,
    discount_percentage,
    stock_quantity,
    image_url,
    sku,
    volume,
    spf,
    is_featured,
    is_active
) VALUES (
    'Your Product Name',                    -- name
    'your-product-slug',                    -- slug (lowercase, hyphens)
    'Product description here',              -- description
    'category-uuid-here',                    -- category_id (UUID from categories table)
    'subcategory-uuid-here',                 -- subcategory_id (UUID, can be NULL)
    2990,                                    -- price (decimal)
    3390,                                    -- original_price (decimal, can be NULL)
    12,                                      -- discount_percentage (integer)
    50,                                      -- stock_quantity (integer)
    'https://via.placeholder.com/400x400?text=Product+Image',  -- image_url
    'KK-000001',                             -- sku (unique)
    '50ml',                                  -- volume (string, can be NULL)
    NULL,                                    -- spf (integer, can be NULL)
    false,                                   -- is_featured (boolean)
    true                                     -- is_active (boolean)
) RETURNING id;

-- Step 3: After getting product_id from above, add features (optional)
INSERT INTO product_features (product_id, title, description, display_order)
VALUES 
    ('product-uuid-here', 'Feature 1', 'Description 1', 1),
    ('product-uuid-here', 'Feature 2', 'Description 2', 2);

-- Step 4: Add ingredients (optional)
INSERT INTO product_ingredients (product_id, ingredient_name, display_order)
VALUES 
    ('product-uuid-here', 'Ingredient 1', 1),
    ('product-uuid-here', 'Ingredient 2', 2);

-- Step 5: Add swatches/colors (optional)
INSERT INTO product_swatches (product_id, color_hex, color_name, display_order)
VALUES 
    ('product-uuid-here', '#FFB6C1', 'Pink', 1),
    ('product-uuid-here', '#FF69B4', 'Hot Pink', 2);

-- Step 6: Add additional images (optional)
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
VALUES 
    ('product-uuid-here', 'https://via.placeholder.com/400x400?text=Image1', true, 1),
    ('product-uuid-here', 'https://via.placeholder.com/400x400?text=Image2', false, 2);

