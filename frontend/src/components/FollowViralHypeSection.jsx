import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const FollowViralHypeSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef(null);

    // Carousel images - you can update these paths with actual images
    const carouselImages = [
        {
            id: 1,
            image: '/images/whatsnew/whatsnew_1.webp',
            alt: 'Woman applying product'
        },
        {
            id: 2,
            image: '/images/whatsnew/whatsnew_2.webp',
            alt: 'Makeup products in red box'
        },
        {
            id: 3,
            image: '/images/whatsnew/whatsnew_main.webp',
            alt: 'Hand with red primer'
        },
        {
            id: 4,
            image: '/images/whatsnew/whatsnew_1.webp',
            alt: 'Woman applying eyeliner'
        },
        {
            id: 5,
            image: '/images/whatsnew/whatsnew_2.webp',
            alt: 'Arm swatches of lipstick'
        },
        {
            id: 6,
            image: '/images/whatsnew/whatsnew_main.webp',
            alt: 'Product packaging'
        }
    ];

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
            setCurrentIndex(Math.max(0, currentIndex - 1));
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
            setCurrentIndex(Math.min(carouselImages.length - 1, currentIndex + 1));
        }
    };

    return (
        <section className="bg-white py-12 md:py-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <h2 className="text-3xl md:text-4xl font-light uppercase tracking-wide text-gray-900">
                            Follow the viral hype
                        </h2>
                        <span className="text-2xl">⭐</span>
                        <span className="text-2xl">🌸</span>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex items-center justify-center gap-6 mb-8">
                        <a
                            href="https://www.instagram.com/kikomilano"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                        >
                            <Instagram size={20} />
                            <span className="text-sm font-medium">@kikomilano</span>
                        </a>
                        <a
                            href="https://www.tiktok.com/@kikomilano"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="text-gray-700"
                            >
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                            </svg>
                            <span className="text-sm font-medium">TikTok</span>
                        </a>
                    </div>
                </div>

                {/* Image Carousel */}
                <div className="relative mb-8">
                    {/* Left Arrow Button */}
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-md transition-all"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={24} className="text-gray-900" />
                    </button>

                    {/* Carousel Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 overflow-x-auto scroll-smooth px-12 no-scrollbar"
                    >
                        {carouselImages.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className="flex-shrink-0 w-[280px] md:w-[300px] h-[400px] md:h-[400px] relative group"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.alt}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Arrow Button */}
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-md transition-all"
                        aria-label="Next image"
                    >
                        <ChevronRight size={24} className="text-gray-900" />
                    </button>
                </div>

                {/* See More Button */}
                <div className="text-center">
                    <Link
                        to="/viral-hype"
                        className="inline-block border border-gray-900 bg-white text-gray-900 px-8 py-3 uppercase text-xs font-bold tracking-wider hover:bg-gray-50 transition-colors rounded"
                    >
                        SEE MORE
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FollowViralHypeSection;

