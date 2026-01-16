import api from '../config/api';

const productService = {
  // Get all products with filters
  getProducts: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      if (filters.category) params.append('category', filters.category);
      if (filters.subcategory) params.append('subcategory', filters.subcategory);
      if (filters.search) params.append('search', filters.search);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.featured) params.append('featured', 'true');
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

      const response = await api.get(`/products?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to fetch products' };
    }
  },

  // Get single product by slug
  getProductBySlug: async (slug) => {
    try {
      const response = await api.get(`/products/${slug}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Product not found' };
    }
  },

  // Get all categories
  getCategories: async () => {
    try {
      const response = await api.get('/products/categories');
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to fetch categories' };
    }
  },

  // Get subcategories by category
  getSubcategories: async (categorySlug) => {
    try {
      const response = await api.get(`/products/categories/${categorySlug}/subcategories`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to fetch subcategories' };
    }
  },

  // Get featured products
  getFeaturedProducts: async (limit = 8) => {
    try {
      const response = await api.get(`/products?featured=true&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to fetch featured products' };
    }
  },

  // Get new products (last 30 days)
  getNewProducts: async (limit = 10) => {
    try {
      const response = await api.get('/products', {
        params: {
          new: 'true',
          limit,
          sortBy: 'created_at',
          sortOrder: 'DESC'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching new products:', error);
      throw error.response?.data || { success: false, message: 'Failed to fetch new products' };
    }
  }
};

export default productService;
