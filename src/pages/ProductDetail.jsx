import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import mockData from '../data/mockData.json';
import { useCart } from '../context/CartContext';
import QuantitySelector from '../components/QuantitySelector';
import { Heart, Share2, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const product = mockData.products.find(p => p.id === parseInt(id));
    const [quantity, setQuantity] = useState(1);
    const [selectedSwatch, setSelectedSwatch] = useState(product?.swatches?.[0]);

    if (!product) return <div className="container mx-auto px-4 py-20 text-center">Product not found</div>;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-16">
                {/* Product Images */}
                <div className="flex-1 space-y-4">
                    <div className="aspect-square bg-gray-100 overflow-hidden rounded-2xl">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                                <img src={product.image} alt={`${product.name} ${i}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 space-y-8">
                    <div>
                        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{product.category}</p>
                        <h1 className="text-4xl font-bold uppercase tracking-widest mb-4">{product.name}</h1>
                        <div className="flex items-center gap-4">
                            <span className="text-2xl font-bold text-secondary">PKR {product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                                <span className="text-lg text-gray-400 line-through">PKR {product.originalPrice.toLocaleString()}</span>
                            )}
                            {product.discount && (
                                <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">-{product.discount}%</span>
                            )}
                        </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed">{product.description}</p>

                    {/* Swatches */}
                    {product.swatches && (
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Color: <span className="text-gray-500">{selectedSwatch}</span></h3>
                            <div className="flex flex-wrap gap-3">
                                {product.swatches.map(swatch => (
                                    <button
                                        key={swatch}
                                        onClick={() => setSelectedSwatch(swatch)}
                                        className={`w-10 h-10 rounded-full border-2 transition-all ${selectedSwatch === swatch ? 'border-primary scale-110' : 'border-transparent'}`}
                                        style={{ backgroundColor: swatch }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <QuantitySelector
                            quantity={quantity}
                            onIncrease={() => setQuantity(q => q + 1)}
                            onDecrease={() => setQuantity(q => q > 1 ? q - 1 : 1)}
                        />
                        <button
                            onClick={() => addToCart(product, quantity)}
                            className="btn-primary flex-grow py-4"
                        >
                            Add to Bag
                        </button>
                        <button className="p-4 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                            <Heart size={24} />
                        </button>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
                        <div className="flex flex-col items-center text-center gap-2">
                            <Truck size={24} className="text-primary" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Free Shipping</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <RotateCcw size={24} className="text-primary" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">30 Days Return</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <ShieldCheck size={24} className="text-primary" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Secure Payment</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
