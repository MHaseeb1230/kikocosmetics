import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    return (
        <div className="group relative bg-primary">
            <div className="relative aspect-square overflow-hidden bg-primary">
                <Link to={`/product/${product.id}`}>
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

            <div className="mt-3 px-1">
                <h3 className="text-[10px] font-normal uppercase tracking-wider text-secondary mb-2 leading-tight">
                    <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors">
                        {product.name}
                    </Link>
                </h3>
                <div className="flex flex-col gap-1">
                    {product.originalPrice && product.originalPrice > product.price ? (
                        <>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-[var(--color-text-secondary)] line-through">Regular price</span>
                                <span className="text-[10px] text-[var(--color-text-secondary)] line-through">PKR {product.originalPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-semibold text-secondary">Sale price</span>
                                <span className="text-[10px] font-semibold text-secondary">PKR {product.price.toLocaleString()}</span>
                            </div>
                            <div className="text-[9px] text-[var(--color-text-secondary)]">
                                Unit price / per
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-[var(--color-text-secondary)]">Regular price</span>
                                <span className="text-[10px] text-[var(--color-text-secondary)]">PKR {product.price.toLocaleString()}</span>
                            </div>
                            <div className="text-[9px] text-[var(--color-text-secondary)]">
                                Unit price / per
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
