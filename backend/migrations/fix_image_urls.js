import pool from '../config/database.js';

async function fixImageUrls() {
  console.log('🔧 Fixing product image URLs...\n');

  try {
    // Update all external CDN URLs to placeholder
    const result = await pool.query(
      `UPDATE products 
       SET image_url = 'https://via.placeholder.com/400x400?text=Product+Image' 
       WHERE image_url LIKE '%kikocosmetics.pk%' 
       OR image_url LIKE '%cdn%'`
    );

    console.log(`✅ Updated ${result.rowCount} products with placeholder images\n`);

    // Show sample of updated products
    const sample = await pool.query(
      'SELECT id, name, image_url FROM products LIMIT 5'
    );
    
    console.log('Sample products:');
    sample.rows.forEach(product => {
      console.log(`  - ${product.name}: ${product.image_url}`);
    });

  } catch (error) {
    console.error('❌ Error fixing image URLs:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

fixImageUrls()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));

