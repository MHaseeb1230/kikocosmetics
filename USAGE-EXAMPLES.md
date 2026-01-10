# 🎯 Color System - Usage Examples

Practical examples of how to use the new color system in your components.

---

## 🔧 Quick Start Examples

### **Example 1: Product Card**

```jsx
import colors from '../styles/colors';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border-2 border-default hover:border-brand-primary transition-all">
      <img src={product.image} alt={product.name} />
      
      {/* Price with accent */}
      <div className="p-4">
        <h3 className="text-brand-secondary font-bold">{product.name}</h3>
        <p className="text-brand-primary text-xl font-bold">
          PKR {product.price}
        </p>
        
        {/* Sale badge */}
        {product.onSale && (
          <span className="bg-accent-orange text-white px-2 py-1 rounded text-xs">
            SALE
          </span>
        )}
        
        {/* Add to cart button */}
        <button className="btn-primary w-full mt-4">
          Add to Cart
        </button>
      </div>
    </div>
  );
};
```

---

### **Example 2: Hero Section**

```jsx
const HeroSection = () => {
  return (
    <section 
      className="relative h-screen"
      style={{ backgroundColor: colors.background.golden }}
    >
      {/* Overlay with brand color */}
      <div className="absolute inset-0 bg-brand-secondary opacity-50" />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-6xl font-bold text-white mb-4">
          Welcome to Kiko Milano
        </h1>
        
        <p className="text-brand-primary text-xl mb-8">
          Premium Beauty Products
        </p>
        
        <div className="flex gap-4">
          <button className="btn-primary">
            Shop Now
          </button>
          <button className="btn-outline">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};
```

---

### **Example 3: Navigation Bar**

```jsx
const Navbar = () => {
  return (
    <nav className="bg-brand-secondary text-white">
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* Logo with primary color */}
        <div className="text-brand-primary text-2xl font-bold">
          KIKO
        </div>
        
        {/* Menu items */}
        <div className="flex gap-6">
          <a 
            href="#" 
            className="text-white hover:text-brand-primary transition-colors"
          >
            Make Up
          </a>
          <a 
            href="#" 
            className="text-white hover:text-brand-primary transition-colors"
          >
            Skin Care
          </a>
        </div>
        
        {/* Cart with accent */}
        <button className="bg-accent-orange text-white px-4 py-2 rounded-full">
          Cart (3)
        </button>
      </div>
    </nav>
  );
};
```

---

### **Example 4: Status Notifications**

```jsx
const Notification = ({ type, message }) => {
  const styles = {
    success: 'bg-accent-green text-white',
    warning: 'bg-accent-orange text-white',
    error: 'bg-[#D32F2F] text-white',
    info: 'bg-accent-blue text-white',
  };

  return (
    <div className={`${styles[type]} p-4 rounded-lg flex items-center gap-3`}>
      <span>ℹ️</span>
      <p>{message}</p>
    </div>
  );
};

// Usage
<Notification type="success" message="Product added to cart!" />
<Notification type="warning" message="Only 2 items left in stock!" />
<Notification type="error" message="Payment failed. Try again." />
<Notification type="info" message="Free shipping on orders over PKR 5000" />
```

---

### **Example 5: Category Cards**

```jsx
const CategoryCard = ({ category }) => {
  return (
    <div 
      className="relative h-64 rounded-lg overflow-hidden cursor-pointer group"
      style={{ 
        backgroundColor: colors.background.golden 
      }}
    >
      <img 
        src={category.image} 
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-secondary opacity-30 group-hover:opacity-50 transition-opacity" />
      
      {/* Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h3 className="text-3xl font-bold text-white mb-2">
          {category.name}
        </h3>
        <div className="bg-brand-primary text-brand-secondary px-6 py-2 rounded-full font-semibold">
          Shop Now
        </div>
      </div>
    </div>
  );
};
```

---

### **Example 6: Footer**

```jsx
const Footer = () => {
  return (
    <footer className="bg-brand-secondary text-white py-12">
      <div className="container mx-auto grid grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h4 className="text-brand-primary text-xl font-bold mb-4">
            About KIKO
          </h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-brand-primary transition-colors">
                Our Brand
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-brand-primary transition-colors">
                Store Locations
              </a>
            </li>
          </ul>
        </div>
        
        {/* Column 2 */}
        <div>
          <h4 className="text-brand-primary text-xl font-bold mb-4">
            Customer Service
          </h4>
          <ul className="space-y-2">
            <li className="text-gray-400">
              UAN: 042-111-70-80-90
            </li>
          </ul>
        </div>
        
        {/* Social icons with accent colors */}
        <div className="col-span-2 flex gap-4 justify-end">
          <a 
            href="#" 
            className="bg-accent-blue text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            FB
          </a>
          <a 
            href="#" 
            className="bg-accent-orange text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            IG
          </a>
        </div>
      </div>
      
      {/* Copyright with border */}
      <div className="border-t border-default mt-8 pt-8 text-center">
        <p style={{ color: colors.text.secondary }}>
          © 2026 KIKO Milano. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
```

---

### **Example 7: Sale Banner**

```jsx
const SaleBanner = () => {
  return (
    <div className="bg-accent-orange text-white py-3 px-6 text-center relative overflow-hidden">
      {/* Animated background accent */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(90deg, 
            ${colors.accent.orange} 0%, 
            ${colors.brand.primary} 100%)`
        }}
      />
      
      <div className="relative z-10">
        <p className="text-lg font-bold">
          🎉 WINTER SALE - Up to 70% OFF! 
          <span className="text-brand-primary ml-2">
            Shop Now →
          </span>
        </p>
      </div>
    </div>
  );
};
```

---

### **Example 8: Loading Spinner**

```jsx
const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div 
        className="w-16 h-16 border-4 rounded-full animate-spin"
        style={{
          borderColor: colors.border.light,
          borderTopColor: colors.brand.primary,
        }}
      />
    </div>
  );
};
```

---

### **Example 9: Price Display with Discount**

```jsx
const PriceDisplay = ({ originalPrice, salePrice }) => {
  const discount = Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  
  return (
    <div className="flex items-center gap-3">
      {/* Original price */}
      <span className="text-gray-400 line-through text-sm">
        PKR {originalPrice}
      </span>
      
      {/* Sale price */}
      <span className="text-brand-primary text-2xl font-bold">
        PKR {salePrice}
      </span>
      
      {/* Discount badge */}
      <span className="bg-accent-orange text-white px-2 py-1 rounded text-xs font-bold">
        -{discount}%
      </span>
    </div>
  );
};
```

---

### **Example 10: Search Bar**

```jsx
const SearchBar = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full px-4 py-3 pr-12 border-2 border-default focus:border-brand-primary outline-none rounded-full transition-colors"
      />
      <button 
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-primary text-brand-secondary w-10 h-10 rounded-full flex items-center justify-center hover:bg-hover transition-colors"
      >
        🔍
      </button>
    </div>
  );
};
```

---

## 🎨 Color Combinations Guide

### **Best Combinations**

1. **Primary Hero**
   - Background: `#DBBC5B` (Golden)
   - Text: `#232323` (Dark)
   - Accent: `#FFA910` (Orange)

2. **Dark Section**
   - Background: `#232323` (Dark)
   - Text: `#FFFFFF` (White)
   - Accent: `#DBBC5B` (Golden)

3. **Light Section**
   - Background: `#FFF9E6` (Light Golden)
   - Text: `#232323` (Dark)
   - Accent: `#75440C` (Brown)

4. **Success State**
   - Background: `#008745` (Green)
   - Text: `#FFFFFF` (White)
   - Border: `#006633` (Darker Green)

---

## 💡 Pro Tips

1. **Use hover states**: Add `hover:` prefix to change colors on interaction
2. **Combine colors**: Use gradients with multiple brand colors
3. **Opacity**: Add `/50` or `/80` for transparency (e.g., `bg-primary/50`)
4. **Transitions**: Always add `transition-colors` for smooth changes
5. **Dark mode**: Variables make it easy to switch themes

---

**Happy Coding! 🚀**

