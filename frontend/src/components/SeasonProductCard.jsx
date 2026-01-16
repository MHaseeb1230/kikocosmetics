import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const SeasonProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    return (
        <div className="w-[calc(50%-0.75rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(25%-1.125rem)] lg:w-[calc(20%-1.25rem)] flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-50">
                <Link to={`/product/${product.slug || product.id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                </Link>

                {/* Discount Badge */}
                {discount > 0 && (
                    <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">
                        -{discount}%
                    </div>
                )}

                {/* Sold Out Overlay */}
                {product.isSoldOut && (
                    <div className="absolute top-3 right-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                        Sold
                    </div>
                )}

                {/* Wishlist Button */}
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-primary transition-all shadow-sm">
                    <Heart size={16} />
                </button>
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-grow">
                {/* Product Name */}
                <Link to={`/product/${product.slug || product.id}`}>
                    <h3 className="text-sm font-bold uppercase text-[#1C1B1B] mb-2 line-clamp-1 hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                </Link>

                {/* Description */}
                {product.description && (
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                    </p>
                )}

                {/* Price */}
                <div className="mb-3">
                    {product.originalPrice && product.originalPrice > product.price ? (
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#1C1B1B]">PKR {product.price.toLocaleString()}</span>
                            <span className="text-xs text-gray-500 line-through">PKR {product.originalPrice.toLocaleString()}</span>
                        </div>
                    ) : (
                        <span className="text-sm font-bold text-[#1C1B1B]">PKR {product.price.toLocaleString()}</span>
                    )}
                </div>

                {/* Color Swatches */}
                {product.swatches && product.swatches.length > 0 && (
                    <div className="flex items-center gap-1.5 mb-4">
                        {product.swatches.slice(0, 3).map((color, idx) => (
                            <div
                                key={idx}
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                        {product.swatches.length > 3 && (
                            <span className="text-[10px] text-gray-500">+{product.swatches.length - 3}</span>
                        )}
                    </div>
                )}

                {/* Add to Bag Button */}
                <button
                    onClick={() => !product.isSoldOut && addToCart(product)}
                    disabled={product.isSoldOut}
                    className={`mt-auto py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                        product.isSoldOut
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-[#1C1B1B] text-white hover:bg-opacity-90'
                    }`}
                >
                    {product.isSoldOut ? 'OUT' : 'ADD TO BAG'}
                </button>
            </div>
        </div>
    );
};

export default SeasonProductCard;

