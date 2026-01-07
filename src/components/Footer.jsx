import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');

    return (
        <footer className="bg-white text-[#1C1B1B] pt-16 pb-8">
            <div className="container mx-auto px-4">
                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12 pb-12 border-b border-gray-200">
                    {/* Left Side - Newsletter */}
                    <div className="lg:col-span-1">
                        <h3 className="text-lg md:text-xl font-normal text-[#1C1B1B] mb-2">KIKO Events!</h3>
                        <p className="text-xl md:text-2xl font-bold text-[#1C1B1B] mb-6">Stay in the loop!</p>
                        <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                            Having read the information note pursuant to art. 13 of the GDPR, I declare I am 16 or over, I am asking to receive the newsletter and I give you my consent to send me e-mails with marketing communications as specified in the information note
                        </p>
                        <div className="flex border border-gray-300 rounded">
                            <input
                                type="email"
                                placeholder="Your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="outline-none text-sm w-full px-4 py-3 text-[#1C1B1B] placeholder-gray-400 bg-white"
                            />
                            <button className="bg-[#1C1B1B] text-white px-6 py-3 text-sm font-semibold hover:bg-opacity-90 transition-colors whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    {/* Right Side - Links */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* HELP Column */}
                        <div>
                            <h3 className="text-sm font-bold mb-6 uppercase tracking-widest text-[#1C1B1B]">HELP</h3>
                            <ul className="text-sm text-[#1C1B1B] flex flex-col gap-3">
                                <li><Link to="/help" className="hover:text-gray-600 transition-colors">Help Center</Link></li>
                                <li><Link to="/track" className="hover:text-gray-600 transition-colors">Track Your Order</Link></li>
                                <li><Link to="/account" className="hover:text-gray-600 transition-colors">Your Account</Link></li>
                                <li><Link to="/delivery" className="hover:text-gray-600 transition-colors">Delivery Options</Link></li>
                                <li><Link to="/payment" className="hover:text-gray-600 transition-colors">Payment Accepted</Link></li>
                                <li><Link to="/returns" className="hover:text-gray-600 transition-colors">Return Policy</Link></li>
                                <li><Link to="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link></li>
                                <li><Link to="/terms" className="hover:text-gray-600 transition-colors">Terms & Conditions</Link></li>
                            </ul>
                        </div>

                        {/* ABOUT KIKO Column */}
                        <div>
                            <h3 className="text-sm font-bold mb-6 uppercase tracking-widest text-[#1C1B1B]">ABOUT KIKO</h3>
                            <ul className="text-sm text-[#1C1B1B] flex flex-col gap-3">
                                <li><Link to="/about" className="hover:text-gray-600 transition-colors">Our Brand</Link></li>
                                <li><Link to="/press" className="hover:text-gray-600 transition-colors">Press Releases</Link></li>
                                <li><Link to="/stores" className="hover:text-gray-600 transition-colors">Store Locations</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Social Media */}
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#1C1B1B]">FOLLOW US ON</h3>
                    <div className="flex gap-8">
                        <a 
                            href="https://instagram.com/kikomilano" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-10 h-10 bg-[#1C1B1B] text-white flex items-center justify-center hover:bg-opacity-90 transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram size={20} />
                        </a>
                        <a 
                            href="https://facebook.com/kikomilano" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-10 h-10 bg-[#1C1B1B] text-white flex items-center justify-center hover:bg-opacity-90 transition-colors"
                            aria-label="Facebook"
                        >
                            <Facebook size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
