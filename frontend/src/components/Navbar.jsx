import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import logo from '../assets/logos/Needs Logo.png';
import logoMobile from '../assets/logos/Needs Logo.png';

const Navbar = () => {
    const { cartCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [activeSubcategory, setActiveSubcategory] = useState(null);
    const closeTimeoutRef = useRef(null);

    const handleMouseEnter = (dropdown) => {
        // Clear any pending close timeout
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setActiveDropdown(dropdown);
    };

    const handleMouseLeave = () => {
        // Set a timeout to close the dropdown after 2 seconds
        closeTimeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
            setActiveSubcategory(null);
        }, 2000);
    };

    const handleDropdownMouseEnter = () => {
        // Clear the timeout if user hovers over the dropdown
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
    };

    const handleDropdownMouseLeave = () => {
        // Close immediately when leaving the dropdown
        setActiveDropdown(null);
        setActiveSubcategory(null);
    };

    const menuItems = {
        makeup: {
            title: 'Make Up',
            link: '/category/makeup',
            subcategories: [
                {
                    title: 'Face MakeUp',
                    items: ['Foundations', 'Bronzers & Contours', 'Face Highlighters', 'Face Powders', 'Blush', 'Concealers', 'Makeup Fixers', 'Face Primers']
                },
                {
                    title: 'Eye Makeup',
                    items: ['Mascaras', 'Eye Pencils', 'Eyeliners', 'Eyeshadows', 'Eyebrows']
                },
                {
                    title: 'Lip Makeup',
                    items: ['Lipsticks', 'Lip Pencils', 'Lip Glosses']
                },
                {
                    title: 'Hands',
                    items: ['Nail Polish', 'French Nails', 'Nail Care']
                },
                {
                    title: 'Palettes',
                    items: ['Face Palettes', 'Eye Palettes', 'Combinable Palettes']
                }
            ]
        },
        skincare: {
            title: 'Skin Care',
            link: '/category/skincare',
            subcategories: [
                {
                    title: 'Face',
                    items: ['Moisturisers', 'Cleansing', 'Serums', 'Beauty Masks', 'Anti Blemish', 'Exfoliators']
                },
                {
                    title: 'Lips',
                    items: ['Lip Balms', 'Lip Care']
                },
                {
                    title: 'Hands & Feet',
                    items: ['Hand Cream', 'Foot Treatments']
                }
            ]
        },
        accessories: {
            title: 'Accessories',
            link: '/category/accessories',
            subcategories: [
                {
                    title: 'Face Accessories',
                    items: ['Makeup Sponges and Mirrors', 'Cleansing Sponges']
                },
                {
                    title: 'Eye Accessories',
                    items: ['Steel Eyelash Curlers', 'False Eyelashes', 'Eye Pencil Sharpeners']
                },
                {
                    title: 'Hand Care Accessories',
                    items: ['Nail Polish Removers', 'Manicure', 'Nail Files']
                },
                {
                    title: 'Makeup Brush Sets',
                    items: ['Brush Holders', 'Face Brushes', 'Eye Brushes', 'Lip Brushes']
                }
            ]
        },
        hair: {
            title: 'Hair',
            link: '/category/hair',
            subcategories: [
                {
                    title: 'Hair Care',
                    items: ['Shampoos', 'Sprays', 'Conditioners', 'Serums', 'Masks']
                }
            ]
        }
    };

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
                    <div className="hidden lg:flex items-center border-b border-[var(--color-border)] pb-1 w-64">
                        <Search size={18} className="text-[var(--color-text-secondary)]" />
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
                            src={logo}
                            alt="Kiko Milano"
                            className="h-7 w-18"
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
                            <span className="absolute -top-2 -right-2 bg-primary  text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Category Navigation */}
            <div className="hidden lg:flex justify-center bg-brand-primary py-3 border-t border-b border-[var(--color-border-light)] relative">
                <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest">
                    <div 
                        className="relative"
                        onMouseEnter={() => handleMouseEnter('makeup')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link to="/category/makeup" className=" transition-colors">
                            Creams
                        </Link>
                        {activeDropdown === 'makeup' && (
                            <div 
                                className="absolute bg-brand-primary left-0 top-full mt-3 bg-white shadow-lg z-50 animate-fadeIn flex"
                                onMouseEnter={handleDropdownMouseEnter}
                                onMouseLeave={handleDropdownMouseLeave}
                            >
                                {/* Left Side - Categories */}
                                {/* <div className="bg-brand-primary py-4 min-w-[220px]">
                                    <Link 
                                        to="/category/makeup" 
                                        className="block px-6 py-2 text-[11px] bg-brand-primary font-bold uppercase tracking-wider hover:bg-white transition-colors"
                                    >
                                        Go to Make Up
                                    </Link>
                                    {menuItems.makeup.subcategories.map((category, idx) => (
                                        <div
                                            key={idx}
                                            onMouseEnter={() => setActiveSubcategory(idx)}
                                            className="relative"
                                        >
                                            <div className="px-6 py-2 text-[11px] font-bold uppercase tracking-wider hover:bg-white transition-colors cursor-pointer">
                                                {category.title}
                                            </div>
                                        </div>
                                    ))}
                                </div> */}

                                {/* Right Side - Items */}
                                {activeSubcategory !== null && menuItems.makeup.subcategories[activeSubcategory] && (
                                    <div 
                                        className="bg-white py-4 px-6 min-w-[280px] border-l border-[var(--color-border)] animate-slideIn"
                                        onMouseEnter={() => setActiveSubcategory(activeSubcategory)}
                                    >
                                        <div>
                                            <h3 className="text-[11px] font-bold uppercase tracking-wider mb-3 pb-2 border-b border-[var(--color-border)]">
                                                {menuItems.makeup.subcategories[activeSubcategory].title}
                                            </h3>
                                            <ul className="space-y-1">
                                                {menuItems.makeup.subcategories[activeSubcategory].items.map((item, itemIdx) => (
                                                    <li key={itemIdx}>
                                                        <Link 
                                                            to={`/category/makeup/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                                            className="block py-1.5 text-xs  transition-colors uppercase tracking-wide"
                                                        >
                                                            {item}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div 
                        className="relative bg-brand-primary"
                        onMouseEnter={() => handleMouseEnter('skincare')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link to="/category/skincare" className=" transition-colors">
                            Serums
                        </Link>
                        {/* {activeDropdown === 'skincare' && (
                            <div 
                                className="absolute bg-brand-primary left-0 top-full mt-3 bg-white shadow-lg z-50 animate-fadeIn flex"
                                onMouseEnter={handleDropdownMouseEnter}
                                onMouseLeave={handleDropdownMouseLeave}
                            >
                               
                                <div className=" py-4 min-w-[220px]">
                                    <Link 
                                        to="/category/skincare" 
                                        className="block px-6 py-2 text-[11px] font-bold uppercase tracking-wider hover:bg-white transition-colors"
                                    >
                                        Go to Skin Care
                                    </Link>
                                    {menuItems.skincare.subcategories.map((category, idx) => (
                                        <div
                                            key={idx}
                                            onMouseEnter={() => setActiveSubcategory(idx)}
                                            className="relative"
                                        >
                                            <div className="px-6 py-2 text-[11px] bg-brand-primary font-bold uppercase tracking-wider hover:bg-white transition-colors cursor-pointer">
                                                {category.title}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                
                                {activeSubcategory !== null && menuItems.skincare.subcategories[activeSubcategory] && (
                                    <div 
                                        className="bg-white py-4 px-6 min-w-[280px] border-l border-[var(--color-border)] animate-slideIn"
                                        onMouseEnter={() => setActiveSubcategory(activeSubcategory)}
                                    >
                                        <div>
                                            <h3 className="text-[11px] font-bold uppercase tracking-wider mb-3 pb-2 border-b border-[var(--color-border)]">
                                                {menuItems.skincare.subcategories[activeSubcategory].title}
                                            </h3>
                                            <ul className="space-y-1">
                                                {menuItems.skincare.subcategories[activeSubcategory].items.map((item, itemIdx) => (
                                                    <li key={itemIdx}>
                                                        <Link 
                                                            to={`/category/skincare/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                                            className="block py-1.5 text-xs transition-colors uppercase tracking-wide"
                                                        >
                                                            {item}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )} */}
                    </div>

                    <div 
                        className="relative"
                        onMouseEnter={() => handleMouseEnter('accessories')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link to="/category/accessories" className=" transition-colors">
                           SunScreens
                        </Link>
                        {/* {activeDropdown === 'accessories' && (
                            <div 
                                className="absolute bg-brand-primary left-0 top-full mt-3 bg-white shadow-lg z-50 animate-fadeIn flex"
                                onMouseEnter={handleDropdownMouseEnter}
                                onMouseLeave={handleDropdownMouseLeave}
                            >
                              
                                <div className=" py-4 min-w-[220px]">
                                    <Link 
                                        to="/category/accessories" 
                                        className="block px-6 py-2 text-[11px] font-bold uppercase tracking-wider hover:bg-white transition-colors"
                                    >
                                        Go to Accessories
                                    </Link>
                                    {menuItems.accessories.subcategories.map((category, idx) => (
                                        <div
                                            key={idx}
                                            onMouseEnter={() => setActiveSubcategory(idx)}
                                            className="relative"
                                        >
                                            <div className="px-6 py-2 text-[11px] bg-brand-primary font-bold uppercase tracking-wider hover:bg-white transition-colors cursor-pointer">
                                                {category.title}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                               
                                {activeSubcategory !== null && menuItems.accessories.subcategories[activeSubcategory] && (
                                    <div 
                                        className="bg-white py-4 px-6 min-w-[280px] border-l border-[var(--color-border)] animate-slideIn"
                                        onMouseEnter={() => setActiveSubcategory(activeSubcategory)}
                                    >
                                        <div>
                                            <h3 className="text-[11px] font-bold uppercase tracking-wider mb-3 pb-2 border-b border-[var(--color-border)]">
                                                {menuItems.accessories.subcategories[activeSubcategory].title}
                                            </h3>
                                            <ul className="space-y-1">
                                                {menuItems.accessories.subcategories[activeSubcategory].items.map((item, itemIdx) => (
                                                    <li key={itemIdx}>
                                                        <Link 
                                                            to={`/category/accessories/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                                            className="block py-1.5 text-xs transition-colors uppercase tracking-wide"
                                                        >
                                                            {item}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )} */}
                    </div>

                    <Link to="/category/suncare" className=" transition-colors">Lotions</Link>
                    {/* <Link to="/category/fragrances" className=" transition-colors">Fragrances</Link> */}
                    
                    {/* <div 
                        className="relative"
                        onMouseEnter={() => handleMouseEnter('hair')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link to="/category/hair" className=" transition-colors">
                            Hair
                        </Link>
                        {activeDropdown === 'hair' && (
                            <div 
                                className="absolute bg-brand-primary left-0 top-full mt-3 bg-white shadow-lg z-50 animate-fadeIn flex"
                                onMouseEnter={handleDropdownMouseEnter}
                                onMouseLeave={handleDropdownMouseLeave}
                            >
                            
                                <div className=" py-4 min-w-[220px]">
                                    <Link 
                                        to="/category/hair" 
                                        className="block px-6 py-2 text-[11px] font-bold uppercase tracking-wider hover:bg-white transition-colors"
                                    >
                                        Go to Hair
                                    </Link>
                                    {menuItems.hair.subcategories.map((category, idx) => (
                                        <div
                                            key={idx}
                                            onMouseEnter={() => setActiveSubcategory(idx)}
                                            className="relative"
                                        >
                                            <div className="px-6 py-2 text-[11px] bg-brand-primary font-bold uppercase tracking-wider hover:bg-white transition-colors cursor-pointer">
                                                {category.title}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                              
                                {activeSubcategory !== null && menuItems.hair.subcategories[activeSubcategory] && (
                                    <div 
                                        className="bg-white py-4 px-6 min-w-[280px] border-l border-[var(--color-border)] animate-slideIn"
                                        onMouseEnter={() => setActiveSubcategory(activeSubcategory)}
                                    >
                                        <div>
                                            <h3 className="text-[11px] font-bold uppercase tracking-wider mb-3 pb-2 border-b border-[var(--color-border)]">
                                                {menuItems.hair.subcategories[activeSubcategory].title}
                                            </h3>
                                            <ul className="space-y-1">
                                                {menuItems.hair.subcategories[activeSubcategory].items.map((item, itemIdx) => (
                                                    <li key={itemIdx}>
                                                        <Link 
                                                            to={`/category/hair/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                                            className="block py-1.5 text-xs transition-colors uppercase tracking-wide"
                                                        >
                                                            {item}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div> */}

                    <Link to="/category/new" className=" transition-colors">New</Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[60] bg-white lg:hidden">
                    <div className="p-4 border-b flex justify-between items-center">
                        <img
                            src={logoMobile}
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
