import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import mockData from '../data/mockData.js';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import ProductSlider from '../components/ProductSlider';
import SeasonProductCard from '../components/SeasonProductCard';
import SkinCareProductCard from '../components/SkinCareProductCard';
import { ArrowRight, ChevronLeft, ChevronRight, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import hero images
import hero1 from '../assets/hero/hero1.jpg';
import hero3 from '../assets/hero/hero3.jpg';
import hero4 from '../assets/hero/hero4.jpg';
import hero5 from '../assets/hero/hero5.jpg';

const heroImages = [
    hero1,
    hero5,
    hero3,
    hero4,
];

const Home = () => {
    const featuredProducts = mockData.products.slice(0, 3);
    const flashSaleProducts = mockData.products.filter(p => p.discount >= 50);
    const categories = mockData.categories;
    const [currentSlide, setCurrentSlide] = useState(0);
    const [productSlideIndex, setProductSlideIndex] = useState(0);
    const [selectedNewProduct, setSelectedNewProduct] = useState(0);
    const [selectedSeason, setSelectedSeason] = useState('Winter');
    const seasonScrollRef = useRef(null);
    
    const mostLovedProducts = mockData.products.slice(0, 18);
    const productsPerSlide = 4;
    const totalProductSlides = Math.ceil(mostLovedProducts.length / productsPerSlide);

    // What's New Products Data
    const whatsNewProducts = [
        {
            id: 1,
            title: "New Maxi Mod\nLength & Curl\nMascara\nCollection",
            description: "Up to 24 hours of hold*, 9.8% longer* and 19% curlier*",
            mainImage: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2000",
            smallImage1: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=800",
            smallImage2: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
            thumbnail: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=200"
        },
        {
            id: 2,
            title: "New One Magic Touch\nLip Stylo\nCollection",
            description: "Moisturizing*, demi-matte finish and color in a single swipe",
            mainImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=2000",
            smallImage1: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800",
            smallImage2: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
            thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=200"
        },
        {
            id: 3,
            title: "Your Season\nWinter\nCollection",
            description: "Discover the perfect winter makeup collection",
            mainImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=2000",
            smallImage1: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
            smallImage2: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=800",
            thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=200"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

    const scrollSeasonProducts = (direction) => {
        if (seasonScrollRef.current) {
            const { scrollLeft, clientWidth } = seasonScrollRef.current;
            const scrollTo = direction === 'right' ? scrollLeft + clientWidth : scrollLeft - clientWidth;
            seasonScrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    const seasonProducts = mockData.products.filter(p => p.discount > 0).slice(0, 10);

    return (
        <div className="flex flex-col">
            {/* Free Shipping Banner */}
            {/* <div className="bg-secondary text-white text-center py-2 text-xs uppercase tracking-wider">
                Free Shipping over 20
            </div> */}

            {/* Hero Section Carousel */}
            <section className="relative h-[95vh] overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0"
                    >
                        {/* Hero Background Image */}
                        <img 
                            src={heroImages[currentSlide]}
                            alt={`Hero Banner ${currentSlide + 1}`}
                            className="w-full h-full object-cover"
                        />

                        {/* Sale Box Overlay */}
                        {/* <div className="absolute bottom-20 left-10 md:left-20 z-10">
                            <div className="bg-sale-box px-8 py-6 rounded-lg max-w-sm">
                                <h2 className="text-3xl md:text-4xl font-bold uppercase text-secondary mb-2 tracking-tight">
                                    THE KIKO SALE
                                </h2>
                                <p className="text-lg md:text-xl text-secondary mb-4 font-medium">
                                    30% 50% 70%
                                </p>
                                <Link to="/category/makeup" className="inline-block bg-black text-white px-6 py-3 rounded-md uppercase text-sm font-semibold hover:opacity-90 transition-opacity">
                                    SHOP NOW
                                </Link>
                            </div>
                        </div> */}
                    </motion.div>
                </AnimatePresence>

                {/* Carousel Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                    {heroImages.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-1 transition-all ${currentSlide === idx ? 'bg-white w-8' : 'bg-white/50 w-1'}`}
                        />
                    ))}
                </div>
            </section>

            {/* KIKO MOST LOVED Section */}
            <section className="bg-primary py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-light uppercase tracking-widest text-secondary mb-8 text-center">
                        <strong className="font-bold">KIKO</strong> MOST LOVED
                    </h2>
                    
                    {/* Product Slider */}
                    <div className="relative ">
                        {/* Left Arrow */}
                        <button
                            onClick={() => setProductSlideIndex((prev) => (prev - 1 + totalProductSlides) % totalProductSlides)}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white border border-[var(--color-border)] rounded-full p-2 hover:bg-[var(--color-bg-golden)] transition-colors shadow-md hidden lg:flex items-center justify-center"
                            aria-label="Previous products"
                        >
                            <ChevronLeft size={24} className="text-secondary" />
                        </button>

                        {/* Right Arrow */}
                        <button
                            onClick={() => setProductSlideIndex((prev) => (prev + 1) % totalProductSlides)}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white border border-[var(--color-border)] rounded-full p-2 hover:bg-[var(--color-bg-golden)] transition-colors shadow-md hidden lg:flex items-center justify-center"
                            aria-label="Next products"
                        >
                            <ChevronRight size={24} className="text-secondary" />
                        </button>

                        {/* Slider Container */}
                        <div className="overflow-hidden">
                            <motion.div
                                className="flex"
                                animate={{
                                    x: `-${productSlideIndex * 100}%`
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30
                                }}
                            >
                                {Array.from({ length: totalProductSlides }).map((_, slideIdx) => {
                                    const startIdx = slideIdx * productsPerSlide;
                                    const endIdx = startIdx + productsPerSlide;
                                    const slideProducts = mostLovedProducts.slice(startIdx, endIdx);
                                    
                                    return (
                                        <div
                                            key={slideIdx}
                                            className="min-w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-2"
                                        >
                                            {slideProducts.map(product => (
                                                <ProductCard key={product.id} product={product} />
                                            ))}
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </div>

                        {/* Slider Indicators */}
                        <div className="flex justify-center gap-2 mt-6">
                            {Array.from({ length: totalProductSlides }).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setProductSlideIndex(idx)}
                                    className={`h-1 transition-all ${productSlideIndex === idx ? 'bg-secondary w-8' : 'bg-[var(--color-border)] w-1'}`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <Link to="/category/makeup" className="text-sm font-bold uppercase tracking-widest text-secondary border-b-2 border-secondary pb-1 hover:text-secondary hover:border-secondary transition-colors">
                            View All
                        </Link>
                    </div>
                </div>
            </section>

            {/* What's new Section */}
            <section className="bg-white py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Left Side - Content */}
                        <div className="flex flex-col items-center justify-center">
                            <h2 className="text-2xl md:text-3xl font-light uppercase tracking-widest text-secondary mb-6">
                                What's new
                            </h2>
                            
                            {/* Circular Thumbnails */}
                            <div className="flex gap-4 mb-8">
                                {whatsNewProducts.map((product, idx) => (
                                    <button
                                        key={product.id}
                                        onClick={() => setSelectedNewProduct(idx)}
                                        className={`w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 transition-all ${
                                            selectedNewProduct === idx 
                                                ? 'border-secondary scale-110' 
                                                : 'border-[var(--color-border)] hover:border-primary'
                                        }`}
                                    >
                                        <img
                                            src={product.thumbnail}
                                            alt={`Product ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Product Title */}
                            <h3 className="text-3xl md:text-4xl font-light uppercase tracking-tight text-secondary mb-4 whitespace-pre-line leading-tight">
                                {whatsNewProducts[selectedNewProduct].title.split('\n').map((line, idx) => (
                                    <span key={idx}>
                                        {idx === 0 || idx === 1 ? (
                                            <strong className="font-bold">{line}</strong>
                                        ) : (
                                            line
                                        )}
                                        {idx < whatsNewProducts[selectedNewProduct].title.split('\n').length - 1 && '\n'}
                                    </span>
                                ))}
                            </h3>

                            {/* Product Description */}
                            <p className="text-sm md:text-base text-secondary mb-6">
                                {whatsNewProducts[selectedNewProduct].description}
                            </p>

                            {/* Button */}
                            <Link 
                                to="/category/new" 
                                className="inline-block border border-gray-300 bg-white text-secondary px-6 py-3 uppercase text-xs font-bold hover:bg-[var(--color-bg-light)] transition-colors w-fit"
                            >
                                DISCOVER THE COLLECTION
                            </Link>
                        </div>

                        {/* Right Side - Images */}
                        <div className="flex flex-col gap-4 mr-10">
                            {/* Main Big Image */}
                            <div style={{display: 'contents'}} className="relative w-full aspect-[4/5] md:aspect-square overflow-hidden">
                                <motion.img
                                    style={{borderRadius: '10px'}}
                                    key={selectedNewProduct}
                                    src={whatsNewProducts[selectedNewProduct].mainImage}
                                    alt={whatsNewProducts[selectedNewProduct].title}
                                    className="w-full h-full object-cover"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>

                            {/* Two Small Images */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative w-full aspect-square overflow-hidden">
                                    <motion.img
                                        style={{borderRadius: '10px'}}
                                        key={`small1-${selectedNewProduct}`}
                                        src={whatsNewProducts[selectedNewProduct].smallImage1}
                                        alt="Product detail 1"
                                        className="w-full h-full object-cover"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                                <div className="relative w-full aspect-square overflow-hidden">
                                    <motion.img
                                        style={{borderRadius: '10px'}}
                                        key={`small2-${selectedNewProduct}`}
                                        src={whatsNewProducts[selectedNewProduct].smallImage2}
                                        alt="Product detail 2"
                                        className="w-full h-full object-cover"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Your Season Section */}
            <section className="bg-white py-12 md:py-16">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="relative inline-block mb-6">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 opacity-30 blur-2xl"></div>
                            <div className="relative">
                                <p className="text-sm md:text-base font-light uppercase tracking-widest text-[var(--color-text-secondary)] mb-2">
                                    YOUR SEASON
                                </p>
                                <h2 style={{fontFamily: 'KIKO Pro Arabic_V01 Medium !important'}} className="text-4xl md:text-6xl font-semibold  text-secondary">
                                    {selectedSeason}
                                </h2>
                            </div>
                        </div>

                        {/* Season Buttons */}
                        <div className="flex justify-center gap-2 flex-wrap">
                            {['Winter', 'Spring', 'Summer', 'Fall'].map((season) => (
                                <button
                                    key={season}
                                    onClick={() => setSelectedSeason(season)}
                                    className={`px-6 py-2 text-xs md:text-sm font-bold uppercase tracking-widest transition-all ${
                                        selectedSeason === season
                                            ? 'bg-gradient-to-r border border-none rounded-lg from-blue-500 to-purple-500 text-white shadow-md'
                                            : 'bg-white text-secondary hover:border-gray-400'
                                    }`}
                                >
                                    {season}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Carousel */}
                    <div className="relative">
                        {/* Right Arrow */}
                        <button
                            onClick={() => scrollSeasonProducts('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white border border-gray-300 rounded-full p-3 hover:bg-[var(--color-bg-light)] transition-colors shadow-md hidden md:flex items-center justify-center"
                            aria-label="Next products"
                        >
                            <ChevronRight size={24} className="text-secondary" />
                        </button>

                        {/* Scrollable Product Container */}
                        <div
                            ref={seasonScrollRef}
                            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#cbd5e0 transparent'
                            }}
                        >
                            {seasonProducts.map((product) => (
                                <SeasonProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Categories Section */}
            <div className="bg-primary">
            <section className=" py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-light uppercase tracking-widest text-secondary mb-8 text-center">
                        TOP CATEGORIES
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
                        <Link to="/category/makeup" className="text-center group">
                            <div className="relative aspect-square mb-4 overflow-visible">
                                {/* Blob Background */}
                                <div className="absolute inset-0 bg-accent-blue rounded-[40%] transform rotate-[-10deg] group-hover:scale-105 transition-transform"></div>
                                <div className="relative h-full flex items-center justify-center p-4">
                                    <img 
                                        src="https://kikocosmetics.pk/cdn/shop/files/MAKE_UP_CATEGORY.jpg?v=1710412345" 
                                        alt="LIPS" 
                                        className="w-full h-full object-contain relative z-10" 
                                    />
                                </div>
                            </div>
                            <span className="text-sm font-bold uppercase tracking-widest text-secondary">LIPS</span>
                        </Link>
                        <Link to="/category/makeup" className="text-center group">
                            <div className="relative aspect-square mb-4 overflow-visible">
                                <div className="absolute inset-0 bg-accent-blue rounded-[40%] transform rotate-[5deg] group-hover:scale-105 transition-transform"></div>
                                <div className="relative h-full flex items-center justify-center p-4">
                                    <img 
                                        src="https://kikocosmetics.pk/cdn/shop/files/MAKE_UP_CATEGORY.jpg?v=1710412345" 
                                        alt="EYES" 
                                        className="w-full h-full object-contain relative z-10" 
                                    />
                                </div>
                            </div>
                            <span className="text-sm font-bold uppercase tracking-widest text-secondary">EYES</span>
                        </Link>
                        <Link to="/category/makeup" className="text-center group">
                            <div className="relative aspect-square mb-4 overflow-visible">
                                <div className="absolute inset-0 bg-accent-blue rounded-[40%] transform rotate-[-8deg] group-hover:scale-105 transition-transform"></div>
                                <div className="relative h-full flex items-center justify-center p-4">
                                    <img 
                                        src="https://kikocosmetics.pk/cdn/shop/files/MAKE_UP_CATEGORY.jpg?v=1710412345" 
                                        alt="FACE" 
                                        className="w-full h-full object-contain relative z-10" 
                                    />
                                </div>
                            </div>
                            <span className="text-sm font-bold uppercase tracking-widest text-secondary">FACE</span>
                        </Link>
                        <Link to="/category/skincare" className="text-center group">
                            <div className="relative aspect-square mb-4 overflow-visible">
                                <div className="absolute inset-0 bg-accent-blue rounded-[40%] transform rotate-[6deg] group-hover:scale-105 transition-transform"></div>
                                <div className="relative h-full flex items-center justify-center p-4">
                                    <img 
                                        src="https://kikocosmetics.pk/cdn/shop/files/SKIN_CARE_CATEGORY.jpg?v=1710412345" 
                                        alt="SKIN CARE" 
                                        className="w-full h-full object-contain relative z-10" 
                                    />
                                </div>
                            </div>
                            <span className="text-sm font-bold uppercase tracking-widest text-secondary">SKIN CARE</span>
                        </Link>
                        <Link to="/category/accessories" className="text-center group">
                            <div className="relative aspect-square mb-4 overflow-visible">
                                <div className="absolute inset-0 bg-accent-blue rounded-[40%] transform rotate-[-5deg] group-hover:scale-105 transition-transform"></div>
                                <div className="relative h-full flex items-center justify-center p-4">
                                    <img 
                                        src="https://kikocosmetics.pk/cdn/shop/files/ACCESSORIES_CATEGORY.jpg?v=1710412345" 
                                        alt="ACCESSORIES" 
                                        className="w-full h-full object-contain relative z-10" 
                                    />
                                </div>
                            </div>
                            <span className="text-sm font-bold uppercase tracking-widest text-secondary">ACCESSORIES</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Shop Skin Care Section */}
            <section className=" py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-light uppercase tracking-widest text-secondary mb-8 text-center">
                        Shop <strong className="font-bold">Skin Care</strong>
                    </h2>
                    
                    {/* Product Carousel */}
                    <div className="relative">
                        {/* Right Arrow */}
                        <button
                            onClick={() => {
                                const container = document.getElementById('skincare-scroll');
                                if (container) {
                                    container.scrollBy({ left: 300, behavior: 'smooth' });
                                }
                            }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white border border-gray-300 rounded-full p-3 hover:bg-[var(--color-bg-light)] transition-colors shadow-md hidden md:flex items-center justify-center"
                            aria-label="Next products"
                        >
                            <ChevronRight size={24} className="text-secondary" />
                        </button>

                        {/* Scrollable Product Container */}
                        <div
                            id="skincare-scroll"
                            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#cbd5e0 transparent'
                            }}
                        >
                            {mockData.products.filter(p => p.category === 'skincare' || p.category === 'makeup').slice(0, 10).map(product => (
                                <SkinCareProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <Link to="/category/skincare" className="text-sm font-bold uppercase tracking-widest text-secondary border-b-2 border-secondary pb-1 hover:text-primary hover:border-primary transition-colors">
                            VIEW ALL
                        </Link>
                    </div>
                </div>
            </section>
            </div>
            {/* Our Brand Section */}
            <section className="bg-white py-12 md:py-16 shadow-md mb-[1px]">
                <div className="container mx-auto px-4">
                    {/* Main Content - Image and Text */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
                        {/* Left Side - Image */}
                        <div className="order-2 lg:order-1">
                            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=2000"
                                    alt="KIKO MILANO Brand"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Right Side - Text Content */}
                        <div className="order-1 lg:order-2 flex flex-col justify-center">
                            {/* OUR BRAND Badge */}
                            <div className="mb-6">
                                <span className="inline-block bg-[#FDE7F3] text-secondary px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">
                                    OUR BRAND
                                </span>
                            </div>

                            {/* Main Heading */}
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6 leading-tight">
                                Art · Beauty · Joy
                            </h2>

                            {/* Description */}
                            <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-lg">
                                KIKO MILANO is a brand built for self-expression. We capture global trends and infuse them with our own distinctive style drawn from our Italian perspective before sharing them with our audience across the world.
                            </p>
                        </div>
                    </div>

                    {/* Feature Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {/* Free Shipping */}
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <Truck size={32} className="text-secondary" strokeWidth={1.5} />
                            </div>
                            <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-secondary">
                                FREE SHIPPING FOR ORDERS OVER 5000PKR
                            </h4>
                        </div>

                        {/* Secure Payments */}
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <ShieldCheck size={32} className="text-secondary" strokeWidth={1.5} />
                            </div>
                            <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-secondary">
                                SECURE PAYMENTS PURCHASES ARE SECURE AND GUARANTEED
                            </h4>
                        </div>

                        {/* Easy Exchange */}
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <RotateCcw size={32} className="text-secondary" strokeWidth={1.5} />
                            </div>
                            <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-secondary">
                                EASY EXCHANGE UP TO 7 DAYS AFTER ORDER DELIVERY
                            </h4>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
