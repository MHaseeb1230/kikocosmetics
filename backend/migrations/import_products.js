import pool from '../config/database.js';

// All products from mockData - converted to database format
// Note: Images that are local imports in mockData are converted to URLs or placeholders
const mockProducts = [
  // Need's Products (Full Details)
  {
    id: 1,
    name: "Need's SunKiss Sunscreen 50ml",
    price: 2990,
    originalPrice: 3390,
    discount: 12,
    category: "skincare",
    subcategory: "suncare",
    description: "Need's SunKiss Sunscreen provides ultimate sun protection with SPF 60+++ and advanced UV filters. Water-resistant and long-lasting formula perfect for active lifestyles.",
    volume: "50ml",
    spf: "SPF 60+++",
    image: "https://kikocosmetics.pk/cdn/shop/files/NEEDS_SUNKISS_01.jpg?v=1710412345",
    features: [
      { title: "Water-Resistant & Long-Lasting", description: "Designed to withstand sweat and water, ensuring dependable sun protection during outdoor activities." },
      { title: "Ultimate Sun Protection", description: "Formulated with SPF 60+++ and advanced UV filters, including Octocrylene and Butyl Methoxydibenzoylmethane, for broad-spectrum protection against UVA and UVB rays." },
      { title: "Lightweight, Non-Greasy Formula", description: "Silky, quick-absorbing texture leaves no white cast, offering a matte finish perfect for men's and women's active lifestyles." },
      { title: "Brightening & Skin-Strengthening", description: "Infused with Niacinamide and 3-O-Ethyl Ascorbic Acid to improve skin tone, reduce dark spots, and enhance skin resilience." },
      { title: "Nourishing Plant Extracts", description: "Enriched with Dandelion Leaf Extract, Stephania Tetrandra Extract, and saururus chinensis Extract to soothe and calm skin while delivering antioxidant benefits." }
    ],
    keyIngredients: ["3-O-Ethyl Ascorbic Acid", "Niacinamide", "Ethylhexyl Salicylate", "Butylene Glycol", "Stephania Tetrandra Extract", "1-2-Hexanediol", "Phenylbenzimidazole Sulfonic Acid", "Zinc Oxide", "Sodium Hyaluronate", "Sorbitan Isostearate", "Aminomethyl Propanol"],
    swatches: ["#FFB6C1", "#FF69B4", "#CD5C5C", "#B22222"]
  },
  {
    id: 2,
    name: "Need's Rice And Coconut Facial Cleanser 200ml",
    price: 2990,
    originalPrice: 3490,
    discount: 14,
    category: "skincare",
    subcategory: "cleansing",
    description: "Need's Rice And Coconut Facial Cleanser effectively brightens the skin and reduces dark spots with dual whitening technology. Enriched with hydrating and soothing ingredients for balanced, radiant skin.",
    volume: "200ml",
    image: "https://kikocosmetics.pk/cdn/shop/files/NEEDS_CLEANSER_01.jpg?v=1710412345",
    features: [
      { title: "Dual Whitening Technology", description: "Powered by Alpha-Arbutin and Glutathione, this cleanser effectively brightens the skin and reduces the appearance of dark spots and pigmentation." },
      { title: "Hydrating & Soothing Formula", description: "Deeply hydrate and calm the skin, leaving it soft and balanced." },
      { title: "Vitamin-Infused Radiance", description: "Enhanced Brightening, anti-inflammatory properties, and improved skin texture." },
      { title: "Antioxidant Protection", description: "Shields the skin from environmental damage and promotes a youthful glow." },
      { title: "Gentle Exfoliation with Microbeads", description: "Infused with jojoba esters and colored microbeads, it provides gentle exfoliation to remove dead skin cells for a smoother complexion without irritation." }
    ],
    keyIngredients: ["Alpha-Arbutin", "Glutathione", "Rice Extract", "Panthenol (pro-vitamin Bs)", "Niacinamide (Vitamin B3)", "Jojoba Esters", "Coconut Extract", "Vaccinium Angustifolium (Blueberry Fruit Extracts)"],
    swatches: ["#FFF5E1", "#FFE4C4", "#F5DEB3", "#DEB887", "#D2B48C"]
  },
  {
    id: 3,
    name: "Need's Hydrating Glass Skin Toner 200ml",
    price: 3990,
    originalPrice: 4490,
    discount: 11,
    category: "skincare",
    subcategory: "toner",
    description: "Need's Hydrating Glass Skin Toner delivers multi-level hydration with powerful soothing agents. Infused with hyaluronic acid and antioxidant-rich ingredients for radiant, balanced skin.",
    volume: "200ml",
    image: "https://kikocosmetics.pk/cdn/shop/files/NEEDS_TONER_01.jpg?v=1710412345",
    features: [
      { title: "Deep Hydration & Skin Barrier Support", description: "Infused with Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, and Sodium Acetylated Hyaluronate for multi-level hydration, improving skin elasticity and moisture retention." },
      { title: "Powerful Soothing Agents", description: "Calm irritation and reduce redness, leaving the skin refreshed and balanced." },
      { title: "Antioxidant-Rich Formula", description: "Protect against environmental stressors and promote a radiant complexion." },
      { title: "Nutrient-Boosted Glow", description: "Brighten, smooth, and rejuvenate dull, tired skin." },
      { title: "Gentle for All Skin Types", description: "Lightweight and alcohol-free, this toner delivers hydration and nourishment without clogging pores or causing sensitivity." }
    ],
    keyIngredients: ["Hyaluronic Acid", "Sodium Hyaluronate", "Niacinamide (Vitamin B3)", "Glutathione", "Centella Asiatica Extract", "Camellia Sinensis (Green Tea)", "Helianthus Annuus (Sunflower) Seed Oil Unsaponifiables", "Glycolic Acid", "Allantion"],
    swatches: ["#E0F7FA", "#B2EBF2", "#80DEEA", "#4DD0E1", "#26C6DA"]
  },
  {
    id: 4,
    name: "Need's Hyaluronic Acid Face Serum 30ml",
    price: 4790,
    originalPrice: 5290,
    discount: 9,
    category: "skincare",
    subcategory: "serum",
    description: "Need's Hyaluronic Acid Face Serum features a unique two-phase formula with powerful Blueberry Extract and Aloe Leaf Water for deep hydration. Age-defying peptide complex visibly reduces fine lines and wrinkles.",
    volume: "30ml",
    image: "https://kikocosmetics.pk/cdn/shop/files/NEEDS_HYALURONIC_01.jpg?v=1710412345",
    features: [
      { title: "Dual-Phase Hydration & Nourishment", description: "The Unique two-phase formula powerful Blueberry Extract and Aloe Leaf Water offering deep hydration and soothing properties while replenishing the skin's moisture balance." },
      { title: "Age-Defying Peptide Complex (Anti-Ageing)", description: "Combiness powerful peptides to visibly reduce fine lines and wrinkles, promoting smoother, firmer, and more youthful-looking skin." },
      { title: "Skin Barrier Strengthening", description: "Repairs and reinforces the skin's natural barrier, boosting elasticity while shielding against environmental stressors." },
      { title: "Radiance-Boosting & Soothing Care", description: "Gently exfoliates, brightens, and calms the skin, helping to reduce redness and enhance your complexion natural glow." },
      { title: "Advanced Antioxidant Defense", description: "Packed with antioxidants to protect the skin from free radical damage and support its natural healing process, promoting healthier skin." }
    ],
    keyIngredients: ["Hyaluronic Acid", "Copper Tripeptide", "Vitamin E", "Allantoin", "Vaccinium Angustifolium (Blueberry) Fruit", "Acetyl Hexapeptide-8", "Mandelic Acid", "Centella Asiatica", "Hexapeptide 1-3-9", "Jojoba seed Oil", "Palmitoyl"],
    swatches: ["#E8EAF6", "#C5CAE9", "#9FA8DA", "#7986CB", "#5C6BC0"]
  },
  {
    id: 5,
    name: "Need's Vitamin C Face Serum 30ml",
    price: 4490,
    originalPrice: 4990,
    discount: 10,
    category: "skincare",
    subcategory: "serum",
    description: "Need's Vitamin C Face Serum features a powerful Vitamin C complex with 3-O-Ethyl Ascorbic Acid to brighten complexion and reduce dark spots. Multi-vitamin blend nourishes and revitalizes for glowing, healthy skin.",
    volume: "30ml",
    image: "https://kikocosmetics.pk/cdn/shop/files/NEEDS_VITAMIN_C_01.jpg?v=1710412345",
    features: [
      { title: "Powerful Vitamin C Complex", description: "Formulated with 3-O-Ethyl Ascorbic Asid, a stable form of Vitamin C, this serum brightens the complexion, reducing the appearance of dark spots and hyperpigmentation for a more even skin tone." },
      { title: "Multi-Vitamin Blend for Radiant Skin", description: "Nourishes and revitalizes the skin, leaving it glowing and healthy." },
      { title: "Hydration & Skin Barrier Protection", description: "Help to Restore moisture, improve the skin's hydration levels and reinforce the natural skin barrier for smoother, more resilient skin." },
      { title: "Soothing and Calming", description: "Help calm irritated skin, reduce redness and promote a balanced, calm complexion." }
    ],
    keyIngredients: ["3-O-Ethyl Ascorbic Acid (Stable Vitamin C)", "Phytonadione (Vitamin K)", "Tocopherol (Vitamin B5)", "Sodium Hyaluronate", "Trehalose", "Rosa Rugosa Flower Oil", "Niacinamide (Vitamin B3)", "Cholecalciferol (Vitamin D3)", "Butylene Glycol", "Zinc PCA"],
    swatches: ["#FFF9E6", "#FFF3CD", "#FFECB5", "#FFE69C", "#FFD700"]
  },
  {
    id: 6,
    name: "Need's Acne Solution Face Serum 30ml",
    price: 4490,
    originalPrice: 4990,
    discount: 10,
    category: "skincare",
    subcategory: "serum",
    description: "Need's Acne Solution Face Serum formulated with Salicylic Acid and Willow Bark Extract penetrates deep into pores to clear breakouts and prevent future blemishes. Gentle exfoliation with calming and soothing power.",
    volume: "30ml",
    image: "https://kikocosmetics.pk/cdn/shop/files/NEEDS_ACNE_01.jpg?v=1710412345",
    features: [
      { title: "Advanced Acne Control", description: "Formulated with Salicylic Acid and Willow Bark Extract, this serum penetrates deep into pores to clear breakouts, reduce excess oil, and prevent future blemishes." },
      { title: "Exfoliation Without Irritation", description: "Gentle acids smooth skin texture by encouraging cell turnover while minimizing redness and sensitivity." },
      { title: "Calming & Soothing Power", description: "Soothe inflammation, reduce redness, and promote skin repair." },
      { title: "Oil-Balancing & Hydration", description: "Combines Zinc PCA and Hyaluronic Acid to regulate sebum production while deeply hydrating for a balanced, healthy complexion." },
      { title: "Antioxidant Protection", description: "Shield skin from environmental stressors and promote a more radiant, even-toned appearance." }
    ],
    keyIngredients: ["Salicylic Acid", "Sodium Lactate", "Salix Alba (Willow) Bark Extract", "Centella Asiatic Extract", "Hyaluronic Acid", "Lactobionic Acid", "Pentylene Glycol", "Camellia Sinensis Leaf Extract", "Madecassoside"],
    swatches: ["#E8F5E9", "#C8E6C9", "#A5D6A7", "#81C784", "#66BB6A"]
  },
  {
    id: 7,
    name: "Need's Whitening Face Serum 30ml",
    price: 4490,
    originalPrice: 4990,
    discount: 10,
    category: "skincare",
    subcategory: "serum",
    description: "Need's Whitening Face Serum features Alpha-Arbutin and 3-O-Ethyl Ascorbic Acid to target dark spots for a visibly brighter complexion. Lightweight, fast-absorbing formula with cooling and refreshing sensation.",
    volume: "30ml",
    image: "https://kikocosmetics.pk/cdn/shop/files/NEEDS_WHITENING_01.jpg?v=1710412345",
    features: [
      { title: "Power Brightening Formula", description: "Features Alpha-Arbutin and 3-O-Ethyl Ascorbic Acid which target dark spots and discoloration for a visibly brighter, more even complexion." },
      { title: "Cooling & Refreshing Sensation", description: "Lightweight fast-absorbing texture delivers an instant cooling effect, perfect for revitalizing men's skin." },
      { title: "Hydrating & Soothing Benefits", description: "Deeply hydrate, calm irritation and strengthen the skin barrier." },
      { title: "Anti-Fatigue Complex", description: "Combat signs of tiredness, reduce fine lines and restore energy to your skin." },
      { title: "Non-Greasy & Easy Absorption", description: "Specially designed for men's thicker skin, the serum leaves no residue ensuring a fresh, matte finish for all-day confidence." }
    ],
    keyIngredients: ["Bifida Ferment Lysate", "1,2-Hexanediol", "Sodium Hyaluronate", "Glutathione", "Rosa Rugosa Flower Oil", "Acetyl Hexapeptide-8", "Alpha-Arbutin", "3-O-Ethyl Ascorbic Acid", "Inositol (Vitamin B Complex)"],
    swatches: ["#FFF8E1", "#FFECB3", "#FFE082", "#FFD54F", "#FFCA28"]
  },
  {
    id: 8,
    name: "Need's Hyaluronic Fairness Night Cream *50ml",
    price: 6990,
    originalPrice: 7290,
    discount: 4,
    category: "skincare",
    subcategory: "moisturizer",
    description: "Need's Hyaluronic Fairness Night Cream reduces fine lines and wrinkles while promoting smoother, more even skin tone. Boost collagen and restore elasticity for visibly lifted, youthful skin every morning.",
    volume: "50ml",
    image: "https://kikocmetics.pk/cdn/shop/files/NEEDS_NIGHT_CREAM_01.jpg?v=1710412345",
    features: [
      { title: "Age-Defying Transformation", description: "Reducing the appearance of fine lines and wrinkles while promoting a smoother, more even skin tone, Wake up to younger-looking skin every day." },
      { title: "Firm Youthful Glow", description: "Boost collagen, firm the skin and restore elasticity, Enjoy visibly lifted, smoother and more youthful skin every morning." },
      { title: "Nourishing & Soothing", description: "Nourishes and calms your skin, leaving it soft, supple and perfectly balanced." },
      { title: "Powerful Antioxidant Protection", description: "Potent antioxidants that protect your skin from daily environmental damage, helping to preserve a youthful radiant complexion." },
      { title: "Wake Up to Radiant Skin", description: "Provides intense moisture, leaving your skin plump, refreshed and glowing by morning." }
    ],
    keyIngredients: ["Sodium Hyaluronate", "Retinol", "Lecithin", "Glutathione", "Caprylic/Capric Triglyceride", "Simmondsia Jojoba Seed", "Acetyl Hexapeptide-8", "1-2-Hexanediol", "Allantoin", "Vaccinium Angustifolium (Blueberry) Fruit Extract", "Alumina Magnesium"],
    swatches: ["#F3E5F5", "#E1BEE7", "#CE93D8", "#BA68C8", "#AB47BC"]
  },
  {
    id: 9,
    name: "Need's Vitamin C Brightening Day Cream * 50ml",
    price: 6490,
    originalPrice: 6790,
    discount: 4,
    category: "skincare",
    subcategory: "moisturizer",
    description: "Need's Vitamin C Brightening Day Cream enriched with 3-O-Ethyl Ascorbic Acid and Niacinamide visibly reduces dark spots for a radiant complexion. Lightweight, non-greasy formula perfect as daily base.",
    volume: "50ml",
    image: "https://kikocosmetics.pk/cdn/shop/files/NEEDS_DAY_CREAM_01.jpg?v=1710412345",
    features: [
      { title: "Advanced Brightening & Face Glowing", description: "Enriched with 3-O-Ethyl Ascorbic Acid a stable form of Vitamin C and Niacinamide, this cream visibly reduces dark spots and evens skin tone for a radiant, luminous complexion." },
      { title: "Long-Lasting Hydration & Skin Barrier Support", description: "Deeply hydrates and nourishes the skin while fortifying the natural barrier for smoother, softer texture." },
      { title: "Antioxidant & Environmental Defense", description: "Protects against free radical damage and soothes the skin, promoting a healthy glow." },
      { title: "Skin-Soothing and Restorative Formula", description: "Calms irritated skin, reduces redness and restores balance for a comfortable, refreshed feel all day long." },
      { title: "Perfect Daily Base", description: "Lightweight and non-greasy, this cream absorbs quickly, leaving the skin soft, Smooth and perfectly prepped for makeup application or daily wear." }
    ],
    keyIngredients: ["3-O-Ethyl Ascorbic Acid", "Niacinamide", "Beta-Carotene", "Sodium Hyaluronate", "Sophora Angustifolia Root Extract", "Piper Methysticum Root Extract", "Panthenol (Vitamin B5)", "Butylene Glycol", "Glutathione", "Tocopherol (Vitamin E)", "Salvia Miltiorrhiza Root Extract", "1-2-Hexanediol"],
    swatches: ["#FFF3E0", "#FFE0B2", "#FFCC80", "#FFB74D", "#FFA726"]
  },
  // Makeup Products (Simplified - URL images)
  { id: 10, name: "Smart Fusion Lip Pencil", price: 1715, originalPrice: 2450, discount: 30, category: "makeup", image: "https://kikocosmetics.pk/cdn/shop/files/SMART_FUSION_LIP_PENCIL_01.jpg?v=1710412345", swatches: ["#C97064", "#B5495B", "#8B3A62", "#6B3340", "#A8516E"] },
  { id: 11, name: "Unlimited Lip Stylo", price: 4680, originalPrice: 5850, discount: 20, category: "makeup", image: "https://kikocosmetics.pk/cdn/shop/files/UNLIMITED_LIP_STYLO_01.jpg?v=1710412345", swatches: ["#E6B8B7", "#D4A5A5", "#C48B8B", "#A97272", "#8F5E5E"] },
  { id: 12, name: "Gossamer Emotion Creamy Lipstick", price: 4680, originalPrice: 5850, discount: 20, category: "makeup", image: "https://kikocosmetics.pk/cdn/shop/files/GOSSAMER_EMOTION_LIPSTICK_01.jpg?v=1710412345", swatches: ["#DC143C", "#C71585", "#8B008B", "#B22222", "#CD5C5C"] },
  { id: 13, name: "Jelly Stylo", price: 4193, originalPrice: 5990, discount: 30, category: "makeup", image: "https://kikocosmetics.pk/cdn/shop/files/JELLY_STYLO_01.jpg?v=1710412345", swatches: ["#FFB6C1", "#FF69B4", "#FF1493", "#DB7093", "#FFC0CB"] },
  { id: 14, name: "Long Lasting Colour Lip Marker", price: 4680, originalPrice: 5850, discount: 20, category: "makeup", image: "https://kikocosmetics.pk/cdn/shop/files/LIP_MARKER_01.jpg?v=1710412345", swatches: ["#E74C3C", "#C0392B", "#922B21", "#641E16", "#A93226"] },
  { id: 15, name: "Lasting Matte Veil - 2023", price: 4968, originalPrice: 6210, discount: 20, category: "makeup", image: "https://kikocosmetics.pk/cdn/shop/files/LASTING_MATTE_VEIL_01.jpg?v=1710412345", swatches: ["#D2691E", "#A0522D", "#8B4513", "#654321", "#806517"] },
  { id: 16, name: "Velvet Passion Matte Lipstick", price: 4680, originalPrice: 5850, discount: 20, category: "makeup", image: "https://kikocosmetics.pk/cdn/shop/files/VELVET_PASSION_LIPSTICK_01.jpg?v=1710412345", swatches: ["#8B0000", "#A52A2A", "#B22222", "#DC143C", "#800020"] },
  { id: 17, name: "Lip Volume Tutu Rose New 2019", price: 3528, originalPrice: 4410, discount: 20, category: "makeup", image: "https://kikocosmetics.pk/cdn/shop/files/LIP_VOLUME_TUTU_01.jpg?v=1710412345", swatches: ["#FFC0CB", "#FFB6C1", "#FF69B4", "#FF1493", "#C71585"] },
  { id: 18, name: "Smart Fusion Creamy Lip Crayon", price: 1905, originalPrice: 3810, discount: 50, category: "makeup", image: "https://kikocosmetics.pk/cdn/shop/files/SMART_FUSION_CRAYON_01.jpg?v=1710412345", swatches: ["#DDA0DD", "#DA70D6", "#BA55D3", "#9370DB", "#8B008B"] },
  { id: 19, name: "Hydra Shiny Lip Stylo", price: 3850, originalPrice: 5500, discount: 30, category: "makeup", image: "https://kikocosmetics.pk/cdn/shop/files/HYDRA_SHINY_LIP_STYLO_01.jpg?v=1710412345", swatches: ["#F08080", "#FA8072", "#E9967A", "#CD853F", "#BC8F8F"] },
  { id: 20, name: "Smart Fusion Matte Lip Crayon", price: 1905, originalPrice: 3810, discount: 50, category: "makeup", image: "https://kikocosmetics.pk/cdn/shop/files/SMART_FUSION_MATTE_CRAYON_01.jpg?v=1710412345", swatches: ["#C04000", "#B7410E", "#CC5500", "#D2691E", "#A0522D"] },
  { id: 21, name: "Lip Scrub New 2019", price: 2248, originalPrice: 2810, discount: 20, category: "makeup", image: "https://kikocosmetics.pk/cdn/shop/files/LIP_SCRUB_01.jpg?v=1710412345", swatches: ["#FFF0F5", "#FFE4E1", "#FFB6C1", "#FFC0CB", "#FFD4DB"] },
  { id: 22, name: "Metal Liquid Lip Colour", price: 4347, originalPrice: 6210, discount: 30, category: "makeup", image: "https://kikocosmetics.pk/cdn/shop/files/METAL_LIQUID_LIP_01.jpg?v=1710412345", swatches: ["#C0C0C0", "#B87333", "#E5AA70", "#CD7F32", "#9C7C38"] },
  { id: 23, name: "Lip Balm New 2019", price: 2248, originalPrice: 2810, discount: 20, category: "makeup", image: "https://kikocosmetics.pk/cdn/shop/files/LIP_BALM_01.jpg?v=1710412345", swatches: ["#FFE4E1", "#FADADD", "#FFB6C1", "#FFE4B5", "#F5DEB3"] },
  { id: 24, name: "Instant Colour Matte Liquid Lip Colour", price: 4095, originalPrice: 5850, discount: 30, category: "makeup", image: "https://kikocosmetics.pk/cdn/shop/files/INSTANT_COLOUR_MATTE_01.jpg?v=1710412345", swatches: ["#8B4513", "#A0522D", "#CD853F", "#D2691E", "#B8860B"] },
  { id: 25, name: "Lip Volume Trasparente New 2019", price: 3528, originalPrice: 4410, discount: 20, category: "makeup", image: "https://kikocosmetics.pk/cdn/shop/files/LIP_VOLUME_TRASPARENTE_01.jpg?v=1710412345", swatches: ["#FFFFFF", "#FFFAFA", "#FFF5EE", "#FFE4E1", "#FFEFD5"] },
  // More Skincare
  { id: 26, name: "Smart Drops Glow Glowing Booster", price: 3157, originalPrice: 4510, discount: 30, category: "skincare", image: "https://kikocosmetics.pk/cdn/shop/files/SMART_DROPS_GLOW_01.jpg?v=1710412345", swatches: ["#FFE4B5", "#FFEAA7", "#FFDAB9", "#F0E68C", "#EEE8AA"] },
  { id: 27, name: "New Hydra Pro Glow", price: 9288, originalPrice: 11610, discount: 20, category: "skincare", image: "https://kikocosmetics.pk/cdn/shop/files/HYDRA_PRO_GLOW_01.jpg?v=1710412345", swatches: ["#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC", "#26A69A"] },
  { id: 28, name: "Intensive Hand Cream", price: 3159, originalPrice: 3510, discount: 10, category: "skincare", image: "https://kikocosmetics.pk/cdn/shop/files/INTENSIVE_HAND_CREAM_01.jpg?v=1710412345", swatches: ["#F3E5F5", "#E1BEE7", "#CE93D8", "#BA68C8", "#AB47BC"] },
  { id: 29, name: "Smart Radiance Cream 3In1", price: 5887, originalPrice: 8410, discount: 30, category: "skincare", image: "https://kikocosmetics.pk/cdn/shop/files/SMART_RADIANCE_CREAM_01.jpg?v=1710412345", swatches: ["#FFF9E6", "#FFECB3", "#FFE082", "#FFD54F", "#FFCA28"] },
  { id: 30, name: "Smart Hydra Shot Stick", price: 2975, originalPrice: 4250, discount: 30, category: "skincare", image: "https://kikocosmetics.pk/cdn/shop/files/SMART_HYDRA_SHOT_01.jpg?v=1710412345", swatches: ["#E3F2FD", "#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5"] }
];

async function importProducts() {
  console.log('🌱 Starting product import...\n');

  try {
    // Get category and subcategory mappings
    const categoriesResult = await pool.query('SELECT id, slug FROM categories');
    const subcategoriesResult = await pool.query('SELECT id, slug FROM subcategories');

    const categoryMap = {};
    const subcategoryMap = {};

    categoriesResult.rows.forEach(cat => {
      categoryMap[cat.slug] = cat.id;
    });

    subcategoriesResult.rows.forEach(sub => {
      subcategoryMap[sub.slug] = sub.id;
    });

    console.log('📂 Categories found:', Object.keys(categoryMap));
    console.log('📂 Subcategories found:', Object.keys(subcategoryMap));
    console.log('');

    let imported = 0;
    let skipped = 0;

    for (const product of mockProducts) {
      try {
        // Generate slug from name
        const slug = product.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');

        // Check if product already exists
        const existingProduct = await pool.query(
          'SELECT id FROM products WHERE slug = $1',
          [slug]
        );

        if (existingProduct.rows.length > 0) {
          console.log(`⏭️  Skipping: ${product.name} (already exists)`);
          skipped++;
          continue;
        }

        // Get category and subcategory IDs
        const categoryId = categoryMap[product.category];
        const subcategoryId = product.subcategory ? subcategoryMap[product.subcategory] : null;

        if (!categoryId) {
          console.log(`⚠️  Skipping: ${product.name} (category not found: ${product.category})`);
          skipped++;
          continue;
        }

        // Generate SKU
        const sku = `KK-${product.id.toString().padStart(6, '0')}`;

        // Get image URL (handle both URL strings and object references)
        const imageUrl = typeof product.image === 'string' ? product.image : null;

        // Insert product
        const productResult = await pool.query(
          `INSERT INTO products (
            name, slug, description, category_id, subcategory_id,
            price, original_price, discount_percentage, stock_quantity,
            sku, volume, spf, image_url, is_featured, is_active
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
          RETURNING id`,
          [
            product.name,
            slug,
            product.description || null,
            categoryId,
            subcategoryId,
            product.price,
            product.originalPrice || null,
            product.discount || 0,
            50, // Default stock
            sku,
            product.volume || null,
            product.spf || null,
            imageUrl,
            false, // Not featured by default
            true
          ]
        );

        const productId = productResult.rows[0].id;

        // Insert features
        if (product.features && product.features.length > 0) {
          for (let i = 0; i < product.features.length; i++) {
            const feature = product.features[i];
            await pool.query(
              `INSERT INTO product_features (product_id, title, description, display_order)
               VALUES ($1, $2, $3, $4)`,
              [productId, feature.title, feature.description, i]
            );
          }
        }

        // Insert ingredients
        if (product.keyIngredients && product.keyIngredients.length > 0) {
          for (let i = 0; i < product.keyIngredients.length; i++) {
            const ingredient = product.keyIngredients[i];
            await pool.query(
              `INSERT INTO product_ingredients (product_id, ingredient_name, display_order)
               VALUES ($1, $2, $3)`,
              [productId, ingredient, i]
            );
          }
        }

        // Insert swatches
        if (product.swatches && product.swatches.length > 0) {
          for (let i = 0; i < product.swatches.length; i++) {
            const swatch = product.swatches[i];
            await pool.query(
              `INSERT INTO product_swatches (product_id, color_hex, display_order)
               VALUES ($1, $2, $3)`,
              [productId, swatch, i]
            );
          }
        }

        console.log(`✅ Imported: ${product.name}`);
        imported++;

      } catch (error) {
        console.error(`❌ Error importing ${product.name}:`, error.message);
        skipped++;
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('✅ Product import completed!');
    console.log(`📊 Imported: ${imported}`);
    console.log(`⏭️  Skipped: ${skipped}`);
    console.log('='.repeat(50));

  } catch (error) {
    console.error('❌ Import failed:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run import
importProducts()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
