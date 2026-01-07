import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductSlider = ({ products, title }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section className="container mx-auto px-4 py-16">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold uppercase tracking-widest">{title}</h2>
                <div className="flex gap-2">
                    <button onClick={() => scroll('left')} className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={() => scroll('right')} className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4"
            >
                {products.map((product) => (
                    <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-start group">
                        <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            {/* Badge */}
                            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                {product.discount && (
                                    <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-md">
                                        -{product.discount}%
                                    </span>
                                )}
                                {product.isSoldOut && (
                                    <span className="bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                                        Sold Out
                                    </span>
                                )}
                            </div>

                            {/* Wishlist */}
                            <button className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-primary transition-all shadow-sm">
                                <Heart size={18} />
                            </button>

                            {/* Image */}
                            <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </Link>

                            {/* Info */}
                            <div className="p-6 text-center">
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">{product.category}</p>
                                <Link to={`/product/${product.id}`} className="block text-sm font-bold mb-3 hover:text-primary transition-colors line-clamp-1">
                                    {product.name}
                                </Link>

                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <span className="text-primary font-bold">PKR {product.price.toLocaleString()}</span>
                                    {product.originalPrice && (
                                        <span className="text-gray-400 text-xs line-through">PKR {product.originalPrice.toLocaleString()}</span>
                                    )}
                                </div>

                                {/* Swatches */}
                                {product.swatches && product.swatches.length > 0 && (
                                    <div className="flex justify-center gap-1.5 mb-6">
                                        {product.swatches.slice(0, 3).map((color, i) => (
                                            <div key={i} className="w-3 h-3 rounded-full border border-gray-200" style={{ backgroundColor: color }} />
                                        ))}
                                        {product.swatches.length > 3 && (
                                            <span className="text-[10px] text-gray-400">+{product.swatches.length - 3}</span>
                                        )}
                                    </div>
                                )}

                                <button
                                    disabled={product.isSoldOut}
                                    className={`w-full py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${product.isSoldOut
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-secondary text-white hover:bg-opacity-90'
                                        }`}
                                >
                                    {product.isSoldOut ? 'Out of Stock' : 'Add to Bag'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductSlider;
