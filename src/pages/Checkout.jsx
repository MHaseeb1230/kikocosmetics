import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const { cart, cartTotal } = useCart();

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold uppercase tracking-widest mb-12">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Shipping Form */}
                <div className="space-y-12">
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b pb-4">Contact Information</h2>
                        <div className="space-y-4">
                            <input type="email" placeholder="Email Address" className="w-full p-4 border border-gray-300 rounded-lg outline-none focus:border-primary" />
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="newsletter" className="accent-primary" />
                                <label htmlFor="newsletter" className="text-xs text-gray-500">Email me with news and offers</label>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b pb-4">Shipping Address</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="First Name" className="p-4 border border-gray-300 rounded-lg outline-none focus:border-primary" />
                            <input type="text" placeholder="Last Name" className="p-4 border border-gray-300 rounded-lg outline-none focus:border-primary" />
                            <input type="text" placeholder="Address" className="col-span-2 p-4 border border-gray-300 rounded-lg outline-none focus:border-primary" />
                            <input type="text" placeholder="Apartment, suite, etc. (optional)" className="col-span-2 p-4 border border-gray-300 rounded-lg outline-none focus:border-primary" />
                            <input type="text" placeholder="City" className="p-4 border border-gray-300 rounded-lg outline-none focus:border-primary" />
                            <input type="text" placeholder="Postal Code" className="p-4 border border-gray-300 rounded-lg outline-none focus:border-primary" />
                            <input type="tel" placeholder="Phone" className="col-span-2 p-4 border border-gray-300 rounded-lg outline-none focus:border-primary" />
                        </div>
                    </section>

                    <button className="btn-primary w-full py-4 text-lg">
                        Complete Order
                    </button>
                </div>

                {/* Order Summary */}
                <div className="bg-accent p-8 rounded-2xl h-fit">
                    <h2 className="text-xl font-bold uppercase tracking-widest mb-8">Your Order</h2>
                    <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2">
                        {cart.map(item => (
                            <div key={item.id} className="flex gap-4">
                                <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                        {item.quantity}
                                    </span>
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-xs font-bold uppercase tracking-widest">{item.name}</h3>
                                    <p className="text-[10px] text-gray-500 uppercase">{item.category}</p>
                                </div>
                                <span className="text-xs font-bold">PKR {(item.price * item.quantity).toLocaleString()}</span>
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
        </div>
    );
};

export default Checkout;
