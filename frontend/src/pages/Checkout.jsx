import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import orderService from '../services/orderService';
import { Loader2 } from 'lucide-react';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Get user from localStorage if logged in
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    // Form state
    const [formData, setFormData] = useState({
        email: user?.email || '',
        fullName: user?.fullName || '',
        phone: user?.phone || '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'Pakistan',
        customerNotes: ''
    });

    useEffect(() => {
        // If cart is empty, redirect to cart
        if (cart.length === 0) {
            navigate('/cart');
        }
    }, [cart, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // Prepare order items from cart
            const items = cart.map(item => ({
                productId: item.productId || item.id,
                quantity: item.quantity
            }));

            // Prepare shipping address
            const shippingAddress = {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                addressLine1: formData.addressLine1,
                addressLine2: formData.addressLine2 || null,
                city: formData.city,
                state: formData.state || null,
                postalCode: formData.postalCode || null,
                country: formData.country
            };

            // Create order
            const orderData = {
                items,
                shippingAddress,
                paymentMethod: 'cod', // Cash on delivery
                customerNotes: formData.customerNotes || null
            };

            const response = await orderService.createOrder(orderData);

            if (response.success) {
                // Clear cart after successful order
                await clearCart();
                
                // Redirect to success page
                navigate(`/order-success/${response.data.orderId}`, {
                    state: {
                        orderNumber: response.data.orderNumber,
                        totalAmount: response.data.totalAmount
                    }
                });
            }
        } catch (err) {
            console.error('Order creation error:', err);
            setError(err.message || 'Failed to create order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return null; // Will redirect
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold uppercase tracking-widest mb-12">Checkout</h1>

            {error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Shipping Form */}
                    <div className="space-y-12">
                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b pb-4">Contact Information</h2>
                            <div className="space-y-4">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address *"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-4 border border-gray-300 rounded-lg outline-none focus:border-primary"
                                />
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b pb-4">Shipping Address</h2>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name *"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-4 border border-gray-300 rounded-lg outline-none focus:border-primary"
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number *"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-4 border border-gray-300 rounded-lg outline-none focus:border-primary"
                                />
                                <input
                                    type="text"
                                    name="addressLine1"
                                    placeholder="Address Line 1 *"
                                    value={formData.addressLine1}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-4 border border-gray-300 rounded-lg outline-none focus:border-primary"
                                />
                                <input
                                    type="text"
                                    name="addressLine2"
                                    placeholder="Apartment, suite, etc. (optional)"
                                    value={formData.addressLine2}
                                    onChange={handleChange}
                                    className="w-full p-4 border border-gray-300 rounded-lg outline-none focus:border-primary"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City *"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-4 border border-gray-300 rounded-lg outline-none focus:border-primary"
                                    />
                                    <input
                                        type="text"
                                        name="postalCode"
                                        placeholder="Postal Code"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        className="w-full p-4 border border-gray-300 rounded-lg outline-none focus:border-primary"
                                    />
                                </div>
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State/Province (optional)"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="w-full p-4 border border-gray-300 rounded-lg outline-none focus:border-primary"
                                />
                                <textarea
                                    name="customerNotes"
                                    placeholder="Order notes (optional)"
                                    value={formData.customerNotes}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full p-4 border border-gray-300 rounded-lg outline-none focus:border-primary resize-none"
                                />
                            </div>
                        </section>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Processing...
                                </>
                            ) : (
                                'Complete Order'
                            )}
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-accent p-8 rounded-2xl h-fit sticky top-32">
                        <h2 className="text-xl font-bold uppercase tracking-widest mb-8">Your Order</h2>
                        <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2">
                            {cart.map(item => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                                        <img 
                                            src={item.image || item.image_url} 
                                            alt={item.name || item.product_name} 
                                            className="w-full h-full object-cover" 
                                        />
                                        <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-xs font-bold uppercase tracking-widest">{item.name || item.product_name}</h3>
                                    </div>
                                    <span className="text-xs font-bold">PKR {((parseFloat(item.price) * item.quantity)).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 text-sm pt-6 border-t border-gray-200">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-bold">PKR {cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Shipping</span>
                                <span className="font-bold">FREE</span>
                            </div>
                            <div className="flex justify-between text-lg pt-4 border-t border-gray-200">
                                <span className="font-bold uppercase tracking-widest">Total</span>
                                <span className="font-bold text-primary">PKR {cartTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;
