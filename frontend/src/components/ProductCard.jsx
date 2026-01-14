import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    return (
        <div className="group relative">
            {/* Discount Badge */}
            {discount > 0 && (
                <div className="absolute top-2 left-2 bg-pink-300 text-white text-xs font-bold px-2 py-1 rounded z-10">
                    -{discount}%
                </div>
            )}

            <div className="relative aspect-square overflow-hidden">
                <Link to={`/product/${product.slug || product.id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>

                {product.isSoldOut && (
                    <div className="absolute inset-0 bg-white/30 flex items-center justify-center">
                        <span className="text-sm font-bold uppercase tracking-widest text-secondary">Sold out</span>
                    </div>
                )}
            </div>

            <div className="mt-4 px-3 pb-3">
                {/* Product Description */}
                <p className="text-xs text-[var(--color-text-secondary)] mb-1">
                    {product.category?.name || product.category || 'Product'}
                </p>

                {/* Product Name */}
                <h3 className="text-sm font-normal text-secondary mb-3 leading-tight min-h-[40px]">
                    <Link to={`/product/${product.slug || product.id}`} className="hover:text-primary transition-colors">
                        {product.name}
                    </Link>
                </h3>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-base font-bold text-secondary">
                        PKR {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-sm text-[var(--color-text-light)] line-through">
                            PKR {product.originalPrice.toLocaleString()}
                        </span>
                    )}
                </div>

                {/* Swatches */}
                {product.swatches && product.swatches.length > 0 && (
                    <div className="flex items-center gap-1 mb-3">
                        {product.swatches.slice(0, 4).map((swatch, idx) => (
                            <div
                                key={idx}
                                className="w-6 h-6 rounded-full border border-gray-300"
                                style={{ backgroundColor: swatch }}
                            />
                        ))}
                        {product.swatches.length > 4 && (
                            <span className="text-xs text-[var(--color-text-secondary)] ml-1">
                                + {product.swatches.length - 4}
                            </span>
                        )}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => addToCart(product, 1)}
                        className="flex-1 bg-secondary text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded hover:bg-primary hover:text-secondary transition-all"
                    >
                        ADD TO BAG
                    </button>
                    <button className="w-10 h-10 border-2 border-[var(--color-border)] rounded flex items-center justify-center hover:border-primary transition-colors">
                        <Heart size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
