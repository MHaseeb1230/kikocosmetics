import pool from '../config/database.js';

async function updateProductImage() {
  console.log('🖼️  Updating product image...\n');

  try {
    // Update product image URL to use public folder image
    // Frontend runs on localhost:5173, so we use absolute path
    const imageUrl = 'http://localhost:5173/images/01_sunkiss.png';
    
    const result = await pool.query(
      `UPDATE products 
       SET image_url = $1 
       WHERE id = (SELECT id FROM products LIMIT 1)
       RETURNING id, name, slug, image_url`,
      [imageUrl]
    );

    if (result.rows.length > 0) {
      console.log('✅ Product image updated successfully!\n');
      console.log('Product details:');
      result.rows.forEach(product => {
        console.log(`  ID: ${product.id}`);
        console.log(`  Name: ${product.name}`);
        console.log(`  Slug: ${product.slug}`);
        console.log(`  Image URL: ${product.image_url}`);
      });
    } else {
      console.log('⚠️  No products found to update');
    }

  } catch (error) {
    console.error('❌ Error updating product image:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

updateProductImage()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));

