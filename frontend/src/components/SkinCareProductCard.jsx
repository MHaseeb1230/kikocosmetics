import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const SkinCareProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    return (
        <div className="w-[calc(50%-0.75rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(25%-1.125rem)] lg:w-[calc(20%-1.25rem)] flex-shrink-0 flex flex-col">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-primary mb-4">
                <Link to={`/product/${product.slug || product.id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                </Link>

                {/* Discount Badge */}
                {discount > 0 && (
                    <div className="absolute top-3 left-3 bg-[#F8E0E0] text-[#1C1B1B] text-xs font-bold px-2 py-1">
                        -{discount}%
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col flex-grow px-2">
                {/* Description */}
                {product.description && (
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>
                )}

                {/* Product Name */}
                <Link to={`/product/${product.slug || product.id}`}>
                    <h3 className="text-sm font-bold uppercase text-[#1C1B1B] mb-3 line-clamp-2 hover:text-primary transition-colors leading-tight">
                        {product.name}
                    </h3>
                </Link>

                {/* Price */}
                <div className="mb-3">
                    {product.originalPrice && product.originalPrice > product.price ? (
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#1C1B1B]">PKR {product.price.toLocaleString()}</span>
                            <span className="text-xs text-gray-400 line-through">PKR {product.originalPrice.toLocaleString()}</span>
                        </div>
                    ) : (
                        <span className="text-sm font-bold text-[#1C1B1B]">PKR {product.price.toLocaleString()}</span>
                    )}
                </div>

                {/* Color Swatches */}
                {product.swatches && product.swatches.length > 0 && (
                    <div className="flex items-center gap-1.5 mb-4">
                        {product.swatches.slice(0, 4).map((color, idx) => (
                            <div
                                key={idx}
                                className={`w-4 h-4 rounded-full border ${
                                    idx === 0 ? 'border-[#1C1B1B] border-2' : 'border-gray-300'
                                }`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                        {product.swatches.length > 4 && (
                            <span className="text-[10px] text-gray-500">+{product.swatches.length - 4}</span>
                        )}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2 mt-auto">
                    <button
                        onClick={() => !product.isSoldOut && addToCart(product)}
                        disabled={product.isSoldOut}
                        className={`flex-1 py-2.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${
                            product.isSoldOut
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-[#1C1B1B] text-white hover:bg-opacity-90'
                        }`}
                    >
                        ADD TO BAG
                    </button>
                    <button className="p-2.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                        <Heart size={16} className="text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SkinCareProductCard;

