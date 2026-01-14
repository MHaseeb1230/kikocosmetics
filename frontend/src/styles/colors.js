/**
 * ============================================
 * BRAND COLOR SYSTEM
 * ============================================
 * Complete color configuration for the application
 * Use these colors throughout the app for consistency
 * 
 * To change colors: Simply update the values here
 * and they will reflect across the entire application
 */

const colors = {
  // ============================================
  // PRIMARY BRAND COLORS
  // ============================================
  brand: {
    primary: '#fff5f5',      // Golden/Yellow - Main brand color
    secondary: '#232323',    // Dark Gray/Black - Secondary brand color
  },

  // ============================================
  // SECONDARY ACCENT COLORS
  // ============================================
  accent: {
    brown: '#75440C',        // Brown accent
    orange: '#FFA910',       // Orange accent
    green: '#008745',        // Green accent
    blue: '#0047AB',         // Blue accent
  },

  // ============================================
  // BACKGROUND COLORS
  // ============================================
  background: {
    light: '#F8F8F8',        // Light background
    golden: '#FFF9E6',       // Light golden background
    dark: '#1A1A1A',         // Dark background
    white: '#FFFFFF',        // White background
  },

  // ============================================
  // TEXT COLORS
  // ============================================
  text: {
    primary: '#232323',      // Primary text color
    secondary: '#666666',    // Secondary text color
    light: '#999999',        // Light text color
    white: '#FFFFFF',        // White text
  },

  // ============================================
  // BORDER COLORS
  // ============================================
  border: {
    default: '#E5E5E5',      // Default border color
    light: '#F0F0F0',        // Light border color
    dark: '#333333',         // Dark border color
  },

  // ============================================
  // STATE COLORS (Interactive elements)
  // ============================================
  state: {
    hover: '#C5A548',        // Hover state (darker golden)
    active: '#B09640',       // Active state
    disabled: '#CCCCCC',     // Disabled state
  },

  // ============================================
  // STATUS COLORS
  // ============================================
  status: {
    success: '#008745',      // Success/Green
    warning: '#FFA910',      // Warning/Orange
    error: '#D32F2F',        // Error/Red
    info: '#0047AB',         // Info/Blue
  },
};

// ============================================
// USAGE EXAMPLES:
// ============================================
// 
// In React components:
// -----------------
// import colors from '../styles/colors';
// 
// <div style={{ backgroundColor: colors.brand.primary }}>
// <button style={{ color: colors.text.white }}>
// 
// In Tailwind (use CSS variables):
// -----------------
// className="bg-primary text-white"
// className="bg-brand-primary text-brand-secondary"
// 
// ============================================

export default colors;

