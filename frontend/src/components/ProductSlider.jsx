import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';

const ProductSlider = ({ products, title, showViewAll = false, variant = 'default', viewAllLink = '/category/makeup' }) => {
    const scrollRef = useRef(null);
    const { addToCart } = useCart();
    
    // For card slider variant
    const [productSlideIndex, setProductSlideIndex] = useState(0);
    const productsPerSlide = 4;
    const totalProductSlides = Math.ceil(products.length / productsPerSlide);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    // Card slider variant (like Needs Most Loved)
    if (variant === 'card') {
        return (
            <section className="bg-brand-primary py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-light uppercase tracking-widest text-secondary mb-8 text-center">
                        <strong className="font-bold">{title.split(' ')[0]}</strong> {title.split(' ').slice(1).join(' ').toUpperCase()}
                    </h2>
                    
                    {/* Product Slider */}
                    <div className="relative">
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
                                    const slideProducts = products.slice(startIdx, endIdx);
                                    
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

                    {/* View All Link */}
                    {showViewAll && (
                        <div className="text-center mt-8">
                            <Link to={viewAllLink} className="text-sm font-bold uppercase tracking-widest text-secondary border-b-2 border-secondary pb-1 hover:text-secondary hover:border-secondary transition-colors">
                                View All
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        );
    }

    // Default variant (horizontal scroll slider)
    return (
        <section className="bg-brand-primary py-16">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-bold uppercase tracking-widest">{title}</h2>
                </div>

                <div className="relative">
                    {/* Left Navigation Arrow */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        <ChevronLeft size={24} className="text-gray-700" />
                    </button>

                    {/* Products Carousel */}
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {products.map((product) => {
                            const discount = product.discount || (product.originalPrice 
                                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
                                : 0);
                            
                            return (
                                <div key={product.id} className="min-w-[280px] flex-shrink-0 snap-start">
                                    <div className="relative bg-white rounded-lg overflow-hidden shadow-sm h-full flex flex-col">
                                        {/* Discount Badge */}
                                        {discount > 0 && (
                                            <div className="absolute top-3 left-3 z-10">
                                                <span className="bg-[#FF6B9D] text-white text-xs font-bold px-2.5 py-1 rounded">
                                                    -{discount}%
                                                </span>
                                            </div>
                                        )}

                                        {/* Wishlist Button */}
                                        <button className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
                                            <Heart size={16} className="text-gray-600" />
                                        </button>

                                        {/* Product Image */}
                                        <Link to={`/product/${product.slug || product.id}`} className="block aspect-square overflow-hidden bg-gray-50">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
                                            />
                                        </Link>

                                        {/* Product Info */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            {/* Description */}
                                            {product.description && (
                                                <p className="text-xs text-gray-600 mb-2 line-clamp-2 min-h-[32px]">
                                                    {product.description}
                                                </p>
                                            )}

                                            {/* Product Name */}
                                            <Link to={`/product/${product.slug || product.id}`}>
                                                <h3 className="text-sm font-bold uppercase mb-3 text-gray-900 hover:text-[#FF6B9D] transition-colors line-clamp-1">
                                                    {product.name}
                                                </h3>
                                            </Link>

                                            {/* Price */}
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="text-base font-bold text-gray-900">
                                                    PKR {product.price?.toLocaleString() || '0'}
                                                </span>
                                                {product.originalPrice && product.originalPrice > product.price && (
                                                    <span className="text-xs text-gray-500 line-through">
                                                        PKR {product.originalPrice.toLocaleString()}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Color Swatches */}
                                            {product.swatches && product.swatches.length > 0 && (
                                                <div className="flex items-center gap-1.5 mb-4">
                                                    {product.swatches.slice(0, 4).map((color, i) => (
                                                        <div
                                                            key={i}
                                                            className="w-4 h-4 rounded-full border border-gray-300"
                                                            style={{ backgroundColor: color }}
                                                        />
                                                    ))}
                                                    {product.swatches.length > 4 && (
                                                        <span className="text-xs text-gray-500 ml-1">
                                                            + {product.swatches.length - 4}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-2 mt-auto">
                                                <button
                                                    onClick={() => addToCart(product, 1)}
                                                    disabled={product.isSoldOut}
                                                    className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                                                        product.isSoldOut
                                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                            : 'bg-black text-white hover:bg-gray-800'
                                                    }`}
                                                >
                                                    ADD TO BAG
                                                </button>
                                                <button className="w-10 h-10 border-2 border-gray-300 rounded flex items-center justify-center hover:border-[#FF6B9D] transition-colors">
                                                    <Heart size={16} className="text-gray-600" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Navigation Arrow */}
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        <ChevronRight size={24} className="text-gray-700" />
                    </button>
                </div>

                {/* VIEW ALL Button */}
                {showViewAll && (
                    <div className="flex justify-center mt-8">
                        <button className="px-8 py-3 bg-white border-2 border-gray-300 text-sm font-bold uppercase tracking-wider hover:border-[#FF6B9D] hover:text-[#FF6B9D] transition-colors">
                            VIEW ALL
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductSlider;
