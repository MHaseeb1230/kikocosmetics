# 🎨 Color System Documentation

Complete guide for using the brand color system across the application.

---

## 📋 Color Palette

### **PRIMARY COLORS**

| Color | Hex Code | Usage |
|-------|----------|-------|
| 🟡 **Primary (Golden)** | `#DBBC5B` | Main brand color, CTAs, highlights |
| ⬛ **Secondary (Dark)** | `#232323` | Headers, dark backgrounds |

### **SECONDARY ACCENT COLORS**

| Color | Hex Code | Usage |
|-------|----------|-------|
| 🟤 **Brown** | `#75440C` | Accent elements, badges |
| 🟠 **Orange** | `#FFA910` | Sale tags, warnings, highlights |
| 🟢 **Green** | `#008745` | Success messages, availability |
| 🔵 **Blue** | `#0047AB` | Information, links, trust elements |

---

## 🛠️ How to Use Colors

### **Method 1: CSS Variables (Recommended)**

Use in CSS/Tailwind classes:

```css
/* Background */
.my-element {
  background-color: var(--color-primary);
  color: var(--color-text-white);
}

/* Tailwind - using @theme colors */
<div className="bg-primary text-white">
<button className="bg-secondary hover:opacity-90">
```

### **Method 2: Utility Classes**

Pre-built classes for quick usage:

```jsx
// Background colors
<div className="bg-brand-primary">
<div className="bg-accent-orange">

// Text colors
<span className="text-brand-primary">
<p className="text-accent-green">

// Border colors
<div className="border-brand-primary border-2">
```

### **Method 3: JavaScript/React**

Import the colors object:

```javascript
import colors from './styles/colors';

// In JSX
<div style={{ backgroundColor: colors.brand.primary }}>
<button style={{ color: colors.accent.orange }}>

// In styled-components
const Button = styled.button`
  background: ${colors.brand.primary};
  color: ${colors.text.white};
`;
```

---

## 🎯 Common Use Cases

### **Buttons**

```jsx
// Primary button
<button className="btn-primary">Shop Now</button>

// Secondary button
<button className="btn-secondary">Learn More</button>

// Outline button
<button className="btn-outline">View Details</button>
```

### **Cards & Backgrounds**

```jsx
// Golden highlight
<div className="bg-brand-primary p-4">

// Dark section
<section className="bg-brand-secondary text-white">

// Light background
<div className="bg-accent-golden">
```

### **Status Messages**

```jsx
// Success
<div className="bg-accent-green text-white">

// Warning
<div className="bg-accent-orange text-white">

// Error
<div className="bg-[#D32F2F] text-white">
```

---

## 🔄 Changing Colors Globally

To update colors across the entire application:

### **1. Update CSS Variables**
Edit `src/index.css`:

```css
@theme {
  --color-primary: #DBBC5B;  /* Change this */
}
```

### **2. Update JavaScript Config**
Edit `src/styles/colors.js`:

```javascript
const colors = {
  brand: {
    primary: '#DBBC5B',  // Change this
  }
};
```

### **3. Rebuild**
```bash
npm run build
```

**That's it!** All components using these colors will automatically update.

---

## 📦 Available CSS Variables

### **Brand Colors**
- `--color-primary` → #DBBC5B
- `--color-secondary` → #232323

### **Accent Colors**
- `--color-accent-brown` → #75440C
- `--color-accent-orange` → #FFA910
- `--color-accent-green` → #008745
- `--color-accent-blue` → #0047AB

### **Background Colors**
- `--color-bg-light` → #F8F8F8
- `--color-bg-golden` → #FFF9E6
- `--color-bg-dark` → #1A1A1A

### **Text Colors**
- `--color-text-primary` → #232323
- `--color-text-secondary` → #666666
- `--color-text-light` → #999999
- `--color-text-white` → #FFFFFF

### **State Colors**
- `--color-hover` → #C5A548
- `--color-active` → #B09640
- `--color-disabled` → #CCCCCC

### **Status Colors**
- `--color-success` → #008745
- `--color-warning` → #FFA910
- `--color-error` → #D32F2F
- `--color-info` → #0047AB

---

## ✅ Best Practices

1. **Always use variables** instead of hardcoding colors
2. **Use utility classes** for common patterns
3. **Test contrast** for accessibility (WCAG AA)
4. **Document changes** when updating the color system
5. **Check responsiveness** after color updates

---

## 🎨 Color Accessibility

### **Text on Primary Golden**
- ✅ Black text (#232323) - Good contrast
- ⚠️ White text - Check readability

### **Text on Secondary Dark**
- ✅ White text - Excellent contrast
- ✅ Golden text - Good contrast

### **Text on Accents**
- ✅ White text on all accent colors

---

## 📝 Quick Reference

| Need | Use |
|------|-----|
| Main CTA button | `.btn-primary` or `bg-primary` |
| Dark header | `bg-secondary` |
| Sale badge | `bg-accent-orange` |
| Success message | `bg-accent-green` |
| Info banner | `bg-accent-blue` |
| Light section | `bg-bg-light` |

---

## 🚀 Pro Tips

1. **Theme switching**: All colors are centralized, making dark mode easy to implement
2. **Consistent spacing**: Combine with Tailwind spacing utilities
3. **Animation support**: Colors work with all CSS transitions
4. **SSR compatible**: Colors work in both client and server rendering

---

**Last Updated:** January 2026
**Maintained by:** Development Team

