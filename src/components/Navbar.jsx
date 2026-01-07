import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { cartCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm">
            {/* Top Bar */}
            <div className="bg-secondary text-white text-[10px] py-2 px-4 flex justify-between items-center uppercase tracking-wider">
                <div className="flex items-center gap-4">
                    <Link to="/stores" className="hover:underline flex items-center gap-1">
                        <span className="hidden sm:inline">Stores</span>
                    </Link>
                    <span className="hidden sm:inline">Dial our UAN 042-111-70-80-90 for inquiries.</span>
                </div>
                <div className="flex items-center gap-4">
                    <span>PAK | EN</span>
                </div>
            </div>

            {/* Main Header */}
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <div className="flex items-center gap-4 flex-1">
                    <button className="lg:hidden" onClick={() => setIsMenuOpen(true)}>
                        <Menu size={24} />
                    </button>
                    <div className="hidden lg:flex items-center border-b border-gray-300 pb-1 w-64">
                        <Search size={18} className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="ml-2 outline-none text-sm w-full"
                        />
                    </div>
                </div>

                <div className="flex-1 flex justify-center">
                    <Link to="/">
                        <img
                            src="/src/assets/logos/Logo.webp"
                            alt="Kiko Milano"
                            className="h-7"
                        />
                    </Link>
                </div>

                <div className="flex items-center justify-end gap-4 md:gap-6 flex-1">
                    <Link to="/login" className="hidden md:block hover:text-primary transition-colors">
                        <User size={24} />
                    </Link>
                    <Link to="/wishlist" className="hidden md:block hover:text-primary transition-colors">
                        <Heart size={24} />
                    </Link>
                    <Link to="/cart" className="relative hover:text-primary transition-colors">
                        <ShoppingBag size={24} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Category Navigation */}
            <div className="hidden lg:flex justify-center bg-pink-light py-3 border-t border-b border-pink-200">
                <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest">
                    <Link to="/category/makeup" className="hover:text-primary transition-colors">Make Up</Link>
                    <Link to="/category/skincare" className="hover:text-primary transition-colors">Skin Care</Link>
                    <Link to="/category/accessories" className="hover:text-primary transition-colors">Accessories</Link>
                    <Link to="/category/suncare" className="hover:text-primary transition-colors">Sun Care</Link>
                    <Link to="/category/fragrances" className="hover:text-primary transition-colors">Fragrances</Link>
                    <Link to="/category/hair" className="hover:text-primary transition-colors">Hair</Link>
                    <Link to="/category/new" className="text-primary hover:opacity-80 transition-colors">New</Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[60] bg-white lg:hidden">
                    <div className="p-4 border-b flex justify-between items-center">
                        <img
                            src="/src/assets/logos/Logo.webp"
                            alt="Kiko Milano"
                            className="h-8"
                        />
                        <button onClick={() => setIsMenuOpen(false)}>
                            <X size={24} />
                        </button>
                    </div>
                    <div className="p-4 flex flex-col gap-6 text-sm font-bold uppercase tracking-widest">
                        <Link to="/category/makeup" onClick={() => setIsMenuOpen(false)}>Make Up</Link>
                        <Link to="/category/skincare" onClick={() => setIsMenuOpen(false)}>Skin Care</Link>
                        <Link to="/category/accessories" onClick={() => setIsMenuOpen(false)}>Accessories</Link>
                        <Link to="/category/suncare" onClick={() => setIsMenuOpen(false)}>Sun Care</Link>
                        <Link to="/category/fragrances" onClick={() => setIsMenuOpen(false)}>Fragrances</Link>
                        <Link to="/category/hair" onClick={() => setIsMenuOpen(false)}>Hair</Link>
                        <Link to="/category/new" className="text-primary" onClick={() => setIsMenuOpen(false)}>New</Link>
                        <hr />
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>Account</Link>
                        <Link to="/wishlist" onClick={() => setIsMenuOpen(false)}>Wishlist</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
