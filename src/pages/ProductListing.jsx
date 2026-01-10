import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import mockData from '../data/mockData.js';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

const ProductListing = () => {
    const { id } = useParams();
    const [sortBy, setSortBy] = useState('featured');
    const [priceRange, setPriceRange] = useState(10000);

    const category = mockData.categories.find(c => c.id === id);

    // Scroll to top when component mounts or category changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const filteredProducts = useMemo(() => {
        let products = mockData.products.filter(p => p.category === id);

        if (sortBy === 'price-low') {
            products.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            products.sort((a, b) => b.price - a.price);
        }

        return products.filter(p => p.price <= priceRange);
    }, [id, sortBy, priceRange]);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold uppercase tracking-widest mb-4">{category?.name || 'Products'}</h1>
                <p className="text-gray-500">Showing {filteredProducts.length} products</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <div className="sticky top-32 space-y-8">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                                <SlidersHorizontal size={18} /> Filters
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest mb-4 block">Price Range</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="10000"
                                        step="500"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                        className="w-full accent-primary"
                                    />
                                    <div className="flex justify-between text-[10px] font-bold mt-2">
                                        <span>PKR 0</span>
                                        <span>PKR {priceRange.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-grow">
                    <div className="flex justify-end mb-8">
                        <div className="relative group">
                            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-secondary pb-1">
                                Sort By: {sortBy} <ChevronDown size={14} />
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                                <button onClick={() => setSortBy('featured')} className="w-full text-left px-4 py-2 text-[10px] font-bold uppercase hover:bg-accent">Featured</button>
                                <button onClick={() => setSortBy('price-low')} className="w-full text-left px-4 py-2 text-[10px] font-bold uppercase hover:bg-accent">Price: Low to High</button>
                                <button onClick={() => setSortBy('price-high')} className="w-full text-left px-4 py-2 text-[10px] font-bold uppercase hover:bg-accent">Price: High to Low</button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-500 italic">No products found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductListing;
