import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

async function seedDatabase() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // 1. Create admin user
    console.log('Creating admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await pool.query(`
      INSERT INTO users (full_name, email, password_hash, role, is_verified, is_active)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (email) DO NOTHING
    `, ['Admin User', 'admin@kikocosmetics.com', hashedPassword, 'admin', true, true]);

    // 2. Create categories
    console.log('Creating categories...');
    const categories = [
      { name: 'Make Up', slug: 'makeup', description: 'Complete makeup collection' },
      { name: 'Skin Care', slug: 'skincare', description: 'Premium skincare products' },
      { name: 'Accessories', slug: 'accessories', description: 'Beauty accessories and tools' },
      { name: 'Hair', slug: 'hair', description: 'Hair care products' }
    ];

    for (const cat of categories) {
      await pool.query(`
        INSERT INTO categories (name, slug, description, is_active)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (slug) DO NOTHING
      `, [cat.name, cat.slug, cat.description, true]);
    }

    // 3. Create subcategories for Make Up
    console.log('Creating subcategories...');
    const makeupCategoryResult = await pool.query(
      'SELECT id FROM categories WHERE slug = $1',
      ['makeup']
    );
    const makeupCategoryId = makeupCategoryResult.rows[0].id;

    const makeupSubcategories = [
      { name: 'Face Makeup', slug: 'face-makeup' },
      { name: 'Eye Makeup', slug: 'eye-makeup' },
      { name: 'Lip Makeup', slug: 'lip-makeup' },
      { name: 'Nail Polish', slug: 'nail-polish' }
    ];

    for (const subcat of makeupSubcategories) {
      await pool.query(`
        INSERT INTO subcategories (category_id, name, slug, is_active)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (slug) DO NOTHING
      `, [makeupCategoryId, subcat.name, subcat.slug, true]);
    }

    // 4. Create subcategories for Skin Care
    const skincareCategoryResult = await pool.query(
      'SELECT id FROM categories WHERE slug = $1',
      ['skincare']
    );
    const skincareCategoryId = skincareCategoryResult.rows[0].id;

    const skincareSubcategories = [
      { name: 'Cleansing', slug: 'cleansing' },
      { name: 'Toner', slug: 'toner' },
      { name: 'Serum', slug: 'serum' },
      { name: 'Moisturizer', slug: 'moisturizer' },
      { name: 'Sun Care', slug: 'suncare' }
    ];

    for (const subcat of skincareSubcategories) {
      await pool.query(`
        INSERT INTO subcategories (category_id, name, slug, is_active)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (slug) DO NOTHING
      `, [skincareCategoryId, subcat.name, subcat.slug, true]);
    }

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📝 Admin Credentials:');
    console.log('   Email: admin@kikocosmetics.com');
    console.log('   Password: admin123');
    console.log('\n⚠️  Please change the admin password after first login!');

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run seeding
seedDatabase()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));


