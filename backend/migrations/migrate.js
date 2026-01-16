import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations() {
  console.log('🚀 Starting database migrations...\n');

  try {
    // Read the migration SQL file
    const migrationPath = path.join(__dirname, '001_create_tables.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    // Execute the migration
    await pool.query(migrationSQL);

    console.log('✅ All migrations completed successfully!\n');
    console.log('📊 Database tables created:');
    console.log('   - users');
    console.log('   - addresses');
    console.log('   - categories');
    console.log('   - subcategories');
    console.log('   - products');
    console.log('   - product_features');
    console.log('   - product_ingredients');
    console.log('   - product_swatches');
    console.log('   - product_images');
    console.log('   - carts');
    console.log('   - cart_items');
    console.log('   - orders');
    console.log('   - order_items');
    console.log('   - order_status_history');
    console.log('   - wishlist');
    console.log('   - reviews');
    console.log('\n✨ Database is ready to use!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run migrations
runMigrations()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));





