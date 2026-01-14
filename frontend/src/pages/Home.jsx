import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import ProductSlider from '../components/ProductSlider';
import SeasonProductCard from '../components/SeasonProductCard';
import SkinCareProductCard from '../components/SkinCareProductCard';
import { ArrowRight, ChevronLeft, ChevronRight, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import hero images
import hero1 from '../assets/hero/hero1.jpg';
import hero3 from '../assets/hero/hero3.jpg';
import hero4 from '../assets/hero/hero4.jpg';
import hero5 from '../assets/hero/hero5.jpg';

// Import top categories images
import lipsImg from '../assets/topcategories/lips.avif';
import eyesImg from '../assets/topcategories/eyes.avif';
import faceImg from '../assets/topcategories/face.avif';
import skincareImg from '../assets/topcategories/skincare.avif';
import accessoriesImg from '../assets/topcategories/accessories.webp';

const heroImages = [
    hero1,
    hero5,
    hero3,
    hero4,
];

const Home = () => {
    const [flashSaleProducts, setFlashSaleProducts] = useState([]);
    const [mostLovedProducts, setMostLovedProducts] = useState([]);
    const [seasonProducts, setSeasonProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [productSlideIndex, setProductSlideIndex] = useState(0);
    const [selectedNewProduct, setSelectedNewProduct] = useState(0);
    const [selectedSeason, setSelectedSeason] = useState('Winter');
    const seasonScrollRef = useRef(null);
    
    const productsPerSlide = 4;
    const totalProductSlides = Math.ceil(mostLovedProducts.length / productsPerSlide);

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                
                // Fetch all products
                const productsResponse = await productService.getProducts({ limit: 50 });
                const allProducts = productsResponse.success ? productsResponse.data.products : [];
                
                // Fetch categories
                const categoriesResponse = await productService.getCategories();
                const cats = categoriesResponse.success ? (categoriesResponse.data || []) : [];
                
                setCategories(cats);
                
                // Flash sale products (discount >= 50%)
                setFlashSaleProducts(allProducts.filter(p => p.discount >= 50));
                
                // Most loved products (first 18)
                setMostLovedProducts(allProducts.slice(0, 18));
                
                // Season products (with discount)
                setSeasonProducts(allProducts.filter(p => p.discount > 0).slice(0, 10));
                
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchProducts();
    }, []);

    // What's New Products Data
    const whatsNewProducts = [
        {
            id: 1,
            title: "New Maxi Mod\nLength & Curl\nMascara\nCollection",
            description: "Up to 24 hours of hold*, 9.8% longer* and 19% curlier*",
            mainImage: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2000",
            smallImage1: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=800",
            smallImage2: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
            thumbnail: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=200"
        },
        {
            id: 2,
            title: "New One Magic Touch\nLip Stylo\nCollection",
            description: "Moisturizing*, demi-matte finish and color in a single swipe",
            mainImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=2000",
            smallImage1: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800",
            smallImage2: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
            thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=200"
        },
        {
            id: 3,
            title: "Your Season\nWinter\nCollection",
            description: "Discover the perfect winter makeup collection",
            mainImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=2000",
            smallImage1: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
            smallImage2: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=800",
            thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=200"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

    const scrollSeasonProducts = (direction) => {
        if (seasonScrollRef.current) {
            const { scrollLeft, clientWidth } = seasonScrollRef.current;
            const scrollTo = direction === 'right' ? scrollLeft + clientWidth : scrollLeft - clientWidth;
            seasonScrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            {/* Hero Section Carousel */}
            <section className="relative h-[95vh] overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0"
                    >
                        <img 
                            src={heroImages[currentSlide]} 
                            alt={`Hero ${currentSlide + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </AnimatePresence>
                
                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors z-10"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors z-10"
                >
                    <ChevronRight size={24} />
                </button>
            </section>

            {/* Needs Most Loved Section with Slider */}
            {mostLovedProducts.length > 0 && (
                <ProductSlider 
                    title="Needs Most Loved" 
                    products={mostLovedProducts}
                    showViewAll={true}
                />
            )}

            {/* Categories */}
            {categories.length > 0 && (
                <section className="container mx-auto px-4 py-16">
                    <h2 className="text-3xl font-bold uppercase tracking-widest mb-10 text-center">Shop by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {categories.map(category => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                </section>
            )}

            {/* Flash Sale */}
            {flashSaleProducts.length > 0 && (
                <ProductSlider 
                    title="Flash Sale" 
                    products={flashSaleProducts}
                />
            )}

            {/* Season Products */}
            {seasonProducts.length > 0 && (
                <section className="container mx-auto px-4 py-16">
                    <h2 className="text-3xl font-bold uppercase tracking-widest mb-10">Season Special</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {seasonProducts.map(product => (
                            <SeasonProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Home;
