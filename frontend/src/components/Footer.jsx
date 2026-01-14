import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');

    return (
        <footer className="bg-white text-secondary pt-16 pb-8">
            <div className="container mx-auto px-4">
                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12 pb-12 border-b border-[var(--color-border)]">
                    {/* Left Side - Newsletter */}
                    <div className="lg:col-span-1">
                        <h3 className="text-lg md:text-xl font-normal text-secondary mb-2">KIKO Events!</h3>
                        <p className="text-xl md:text-2xl font-bold text-secondary mb-6">Stay in the loop!</p>
                        <p className="text-xs text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                            Having read the information note pursuant to art. 13 of the GDPR, I declare I am 16 or over, I am asking to receive the newsletter and I give you my consent to send me e-mails with marketing communications as specified in the information note
                        </p>
                        <div className="flex border border-[var(--color-border)] rounded">
                            <input
                                type="email"
                                placeholder="Your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="outline-none text-sm w-full px-4 py-3 text-secondary placeholder-[var(--color-text-light)] bg-white"
                            />
                            <button className="bg-secondary text-white px-6 py-3 text-sm font-semibold hover:bg-primary hover:text-secondary transition-colors whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    {/* Right Side - Links */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* HELP Column */}
                        <div>
                            <h3 className="text-sm font-bold mb-6 uppercase tracking-widest text-secondary">HELP</h3>
                            <ul className="text-sm text-secondary flex flex-col gap-3">
                                <li><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
                                <li><Link to="/track" className="hover:text-primary transition-colors">Track Your Order</Link></li>
                                <li><Link to="/account" className="hover:text-primary transition-colors">Your Account</Link></li>
                                <li><Link to="/delivery" className="hover:text-primary transition-colors">Delivery Options</Link></li>
                                <li><Link to="/payment" className="hover:text-primary transition-colors">Payment Accepted</Link></li>
                                <li><Link to="/returns" className="hover:text-primary transition-colors">Return Policy</Link></li>
                                <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                                <li><Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
                            </ul>
                        </div>

                        {/* ABOUT KIKO Column */}
                        <div>
                            <h3 className="text-sm font-bold mb-6 uppercase tracking-widest text-secondary">ABOUT KIKO</h3>
                            <ul className="text-sm text-secondary flex flex-col gap-3">
                                <li><Link to="/about" className="hover:text-primary transition-colors">Our Brand</Link></li>
                                <li><Link to="/press" className="hover:text-primary transition-colors">Press Releases</Link></li>
                                <li><Link to="/stores" className="hover:text-primary transition-colors">Store Locations</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Social Media */}
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-secondary">FOLLOW US ON</h3>
                    <div className="flex gap-8">
                        <a 
                            href="https://instagram.com/kikomilano" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-10 h-10 bg-secondary text-white flex items-center justify-center hover:bg-primary hover:text-secondary transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram size={20} />
                        </a>
                        <a 
                            href="https://facebook.com/kikomilano" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-10 h-10 bg-secondary text-white flex items-center justify-center hover:bg-primary hover:text-secondary transition-colors"
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
