import pool from '../config/database.js';
import readline from 'readline';

// Helper function to get user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function addProductManually() {
  console.log('📦 Add Product Manually\n');
  console.log('Press Ctrl+C to cancel at any time\n');

  try {
    // Get categories
    const categoriesResult = await pool.query('SELECT id, name, slug FROM categories WHERE is_active = true ORDER BY name');
    console.log('Available Categories:');
    categoriesResult.rows.forEach((cat, idx) => {
      console.log(`  ${idx + 1}. ${cat.name} (${cat.slug})`);
    });
    const categoryChoice = await question('\nSelect category number: ');
    const selectedCategory = categoriesResult.rows[parseInt(categoryChoice) - 1];
    if (!selectedCategory) {
      console.log('❌ Invalid category selection');
      process.exit(1);
    }

    // Get subcategories (optional)
    const subcategoriesResult = await pool.query(
      'SELECT id, name, slug FROM subcategories WHERE category_id = $1 AND is_active = true ORDER BY name',
      [selectedCategory.id]
    );
    let selectedSubcategory = null;
    if (subcategoriesResult.rows.length > 0) {
      console.log('\nAvailable Subcategories:');
      console.log('  0. None');
      subcategoriesResult.rows.forEach((sub, idx) => {
        console.log(`  ${idx + 1}. ${sub.name} (${sub.slug})`);
      });
      const subcategoryChoice = await question('\nSelect subcategory number (0 for none): ');
      if (subcategoryChoice !== '0') {
        selectedSubcategory = subcategoriesResult.rows[parseInt(subcategoryChoice) - 1];
      }
    }

    // Get product details
    const name = await question('\nProduct Name: ');
    const slug = await question('Product Slug (lowercase, use hyphens, e.g., "my-product-name"): ');
    const description = await question('Description: ');
    const price = parseFloat(await question('Price (PKR): '));
    const originalPriceInput = await question('Original Price (PKR, press Enter to skip): ');
    const originalPrice = originalPriceInput ? parseFloat(originalPriceInput) : null;
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
    const stock = parseInt(await question('Stock Quantity: '));
    const imageUrl = await question('Image URL (or press Enter for placeholder): ') || 'https://via.placeholder.com/400x400?text=Product+Image';
    const sku = await question('SKU (e.g., KK-000001): ');
    const volume = await question('Volume (e.g., 50ml, press Enter to skip): ') || null;
    const spfInput = await question('SPF (press Enter to skip): ');
    const spf = spfInput ? parseInt(spfInput) : null;

    // Generate slug if not provided
    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    // Check if slug exists
    const existingProduct = await pool.query('SELECT id FROM products WHERE slug = $1', [finalSlug]);
    if (existingProduct.rows.length > 0) {
      console.log('❌ Product with this slug already exists!');
      process.exit(1);
    }

    // Insert product
    const productResult = await pool.query(
      `INSERT INTO products (
        name, slug, description, category_id, subcategory_id,
        price, original_price, discount_percentage, stock_quantity,
        image_url, sku, volume, spf, is_featured, is_active
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING id, name, slug`,
      [
        name,
        finalSlug,
        description || null,
        selectedCategory.id,
        selectedSubcategory?.id || null,
        price,
        originalPrice,
        discount,
        stock,
        imageUrl,
        sku,
        volume,
        spf,
        false,
        true
      ]
    );

    const product = productResult.rows[0];
    console.log(`\n✅ Product added successfully!`);
    console.log(`   ID: ${product.id}`);
    console.log(`   Name: ${product.name}`);
    console.log(`   Slug: ${product.slug}`);
    console.log(`   URL: /product/${product.slug}`);

  } catch (error) {
    console.error('❌ Error adding product:', error.message);
    throw error;
  } finally {
    rl.close();
    await pool.end();
  }
}

addProductManually()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));

