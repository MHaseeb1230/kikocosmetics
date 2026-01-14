import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

const Cart = () => {
    const { cart, cartTotal, cartCount, loading, refreshCart } = useCart();

    useEffect(() => {
        refreshCart();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-32 text-center">
                <p>Loading cart...</p>
            </div>
        );
    }

    if (cartCount === 0) {
        return (
            <div className="container mx-auto px-4 py-32 text-center">
                <ShoppingBag size={64} className="mx-auto text-gray-200 mb-6" />
                <h1 className="text-3xl font-bold uppercase tracking-widest mb-4">Your Bag is Empty</h1>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything to your bag yet.</p>
                <Link to="/" className="btn-primary">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold uppercase tracking-widest mb-12">Shopping Bag ({cartCount})</h1>

            <div className="flex flex-col lg:flex-row gap-16">
                <div className="flex-grow">
                    <div className="border-t border-gray-100">
                        {cart.map(item => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                    <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest mt-8 hover:text-primary transition-colors">
                        <ArrowLeft size={18} /> Continue Shopping
                    </Link>
                </div>

                <aside className="w-full lg:w-96">
                    <div className="bg-accent p-8 rounded-2xl sticky top-32">
                        <h2 className="text-xl font-bold uppercase tracking-widest mb-8">Order Summary</h2>
                        <div className="space-y-4 text-sm mb-8">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-bold">PKR {cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Shipping</span>
                                <span className="text-primary font-bold">FREE</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Tax</span>
                                <span className="font-bold">Calculated at checkout</span>
                            </div>
                            <hr className="border-gray-200" />
                            <div className="flex justify-between text-lg">
                                <span className="font-bold uppercase tracking-widest">Total</span>
                                <span className="font-bold text-primary">PKR {cartTotal.toLocaleString()}</span>
                            </div>
                        </div>
                        <Link to="/checkout" className="btn-secondary w-full py-4 text-center block">
                            Proceed to Checkout
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Cart;
