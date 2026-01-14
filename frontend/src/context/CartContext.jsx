import React, { createContext, useContext, useState, useEffect } from 'react';
import cartService from '../services/cartService';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch cart from backend
    const fetchCart = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await cartService.getCart();
            if (response.success && response.data) {
                setCart(response.data.items || []);
            }
        } catch (err) {
            console.error('Error fetching cart:', err);
            setError(err.message || 'Failed to load cart');
            setCart([]);
        } finally {
            setLoading(false);
        }
    };

    // Load cart on mount
    useEffect(() => {
        fetchCart();
    }, []);

    // Add item to cart
    const addToCart = async (product, quantity = 1) => {
        try {
            setError(null);
            
            // Get product ID - handle different product structures
            const productId = product.id || product.productId;
            
            if (!productId) {
                console.error('Product object:', product);
                throw new Error('Product ID is missing. Product object structure: ' + JSON.stringify(product));
            }
            
            // Log for debugging
            console.log('Adding to cart - Product ID:', productId, 'Type:', typeof productId);
            
            await cartService.addToCart(productId, quantity);
            await fetchCart(); // Refresh cart after adding
        } catch (err) {
            console.error('Error adding to cart:', err);
            setError(err.message || 'Failed to add item to cart');
            throw err;
        }
    };

    // Remove item from cart
    const removeFromCart = async (itemId) => {
        try {
            setError(null);
            await cartService.removeFromCart(itemId);
            await fetchCart(); // Refresh cart after removing
        } catch (err) {
            console.error('Error removing from cart:', err);
            setError(err.message || 'Failed to remove item from cart');
            throw err;
        }
    };

    // Update quantity
    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) return;
        try {
            setError(null);
            await cartService.updateCartItem(itemId, quantity);
            await fetchCart(); // Refresh cart after updating
        } catch (err) {
            console.error('Error updating cart:', err);
            setError(err.message || 'Failed to update cart item');
            throw err;
        }
    };

    // Clear cart
    const clearCart = async () => {
        try {
            setError(null);
            await cartService.clearCart();
            setCart([]);
        } catch (err) {
            console.error('Error clearing cart:', err);
            setError(err.message || 'Failed to clear cart');
            throw err;
        }
    };

    // Calculate totals from cart items
    const cartTotal = cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            removeFromCart, 
            updateQuantity, 
            clearCart, 
            cartTotal, 
            cartCount,
            loading,
            error,
            refreshCart: fetchCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
