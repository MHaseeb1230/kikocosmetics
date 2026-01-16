import api from '../config/api';

const cartService = {
  // Get cart
  getCart: async () => {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to fetch cart' };
    }
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await api.post('/cart/items', { productId, quantity });
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to add item to cart' };
    }
  },

  // Update cart item quantity
  updateCartItem: async (itemId, quantity) => {
    try {
      const response = await api.put(`/cart/items/${itemId}`, { quantity });
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to update cart item' };
    }
  },

  // Remove item from cart
  removeFromCart: async (itemId) => {
    try {
      const response = await api.delete(`/cart/items/${itemId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to remove item from cart' };
    }
  },

  // Clear cart
  clearCart: async () => {
    try {
      const response = await api.delete('/cart');
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to clear cart' };
    }
  },

  // Merge guest cart with user cart (called automatically on login)
  mergeCart: async (sessionId) => {
    try {
      const response = await api.post('/cart/merge', { sessionId });
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to merge cart' };
    }
  }
};

export default cartService;





