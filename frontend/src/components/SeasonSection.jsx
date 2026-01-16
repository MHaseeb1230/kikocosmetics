import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import productService from '../services/productService';
import SeasonProductCard from './SeasonProductCard';

const SeasonSection = () => {
    const [seasonProducts, setSeasonProducts] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState('Winter');
    const [loading, setLoading] = useState(true);
    const seasonScrollRef = useRef(null);

    // Fetch season products
    useEffect(() => {
        const fetchSeasonProducts = async () => {
            try {
                setLoading(true);
                const productsResponse = await productService.getProducts({ limit: 50 });
                const allProducts = productsResponse.success ? productsResponse.data.products : [];
                
                // Season products (with discount)
                setSeasonProducts(allProducts.filter(p => p.discount > 0).slice(0, 10));
            } catch (error) {
                console.error('Error fetching season products:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchSeasonProducts();
    }, []);

    const scrollSeasonProducts = (direction) => {
        if (seasonScrollRef.current) {
            const { scrollLeft, clientWidth } = seasonScrollRef.current;
            const scrollTo = direction === 'right' ? scrollLeft + clientWidth : scrollLeft - clientWidth;
            seasonScrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    if (loading) {
        return null; // Don't show anything while loading
    }

    if (seasonProducts.length === 0) {
        return null; // Don't show section if no products
    }

    return (
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
                            <h2 style={{fontFamily: 'KIKO Pro Arabic_V01 Medium !important'}} className="text-4xl md:text-6xl font-semibold text-secondary">
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
                        className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
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
    );
};

export default SeasonSection;

