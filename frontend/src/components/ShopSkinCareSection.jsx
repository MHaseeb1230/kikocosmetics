import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import productService from '../services/productService';
import SkinCareProductCard from './SkinCareProductCard';

const ShopSkinCareSection = () => {
    const [skincareProducts, setSkincareProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchSkincareProducts = async () => {
            try {
                setLoading(true);
                const productsResponse = await productService.getProducts({ limit: 50 });
                const allProducts = productsResponse.success ? productsResponse.data.products : [];
                
                // Filter skincare and makeup products
                setSkincareProducts(
                    allProducts.filter(p => 
                        p.category?.slug === 'skincare' || 
                        p.category?.slug === 'makeup' ||
                        p.category?.name?.toLowerCase() === 'skincare' ||
                        p.category?.name?.toLowerCase() === 'makeup'
                    ).slice(0, 10)
                );
            } catch (error) {
                console.error('Error fetching skincare products:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchSkincareProducts();
    }, []);

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    if (loading) {
        return null;
    }

    if (skincareProducts.length === 0) {
        return null;
    }

    return (
        <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-light uppercase tracking-widest text-secondary mb-8 text-center">
                    Shop <strong className="font-bold">Skin Care</strong>
                </h2>
                
                {/* Product Carousel */}
                <div className="relative">
                    {/* Right Arrow */}
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white border border-gray-300 rounded-full p-3 hover:bg-[var(--color-bg-light)] transition-colors shadow-md hidden md:flex items-center justify-center"
                        aria-label="Next products"
                    >
                        <ChevronRight size={24} className="text-secondary" />
                    </button>

                    {/* Scrollable Product Container */}
                    <div
                        ref={scrollRef}
                        className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
                        style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#cbd5e0 transparent'
                        }}
                    >
                        {skincareProducts.map(product => (
                            <SkinCareProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>

                <div className="text-center mt-8">
                    <Link 
                        to="/category/skincare" 
                        className="text-sm font-bold uppercase tracking-widest text-secondary border-b-2 border-secondary pb-1 hover:text-primary hover:border-primary transition-colors"
                    >
                        VIEW ALL
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ShopSkinCareSection;




