import React from 'react';
import { Link } from 'react-router-dom';

// Import category images
import lipsImg from '../assets/topcategories/lips.avif';
import eyesImg from '../assets/topcategories/eyes.avif';
import faceImg from '../assets/topcategories/face.avif';
import skincareImg from '../assets/topcategories/skincare.avif';
import accessoriesImg from '../assets/topcategories/accessories.webp';

const TopCategoriesSection = () => {
    const categories = [
        {
            id: 'lips',
            name: 'LIPS',
            image: lipsImg,
            link: '/category/makeup',
            rotation: -10
        },
        {
            id: 'eyes',
            name: 'EYES',
            image: eyesImg,
            link: '/category/makeup',
            rotation: 5
        },
        {
            id: 'face',
            name: 'FACE',
            image: faceImg,
            link: '/category/makeup',
            rotation: -8
        },
        {
            id: 'skincare',
            name: 'SKIN CARE',
            image: skincareImg,
            link: '/category/skincare',
            rotation: 6
        },
        {
            id: 'accessories',
            name: 'ACCESSORIES',
            image: accessoriesImg,
            link: '/category/accessories',
            rotation: -5
        }
    ];

    return (
        <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-light uppercase tracking-widest text-secondary mb-8 text-center">
                    TOP CATEGORIES
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
                    {categories.map((category) => (
                        <Link 
                            key={category.id} 
                            to={category.link} 
                            className="text-center group"
                        >
                            <div className="relative aspect-square mb-4 overflow-visible">
                                {/* Blob Background */}
                                <div 
                                    className="absolute inset-0 rounded-[40%] bg-primary group-hover:scale-105 transition-transform"
                                    style={{ transform: `rotate(${category.rotation}deg)` }}
                                ></div>
                                <div className="relative h-full flex items-center justify-center p-4">
                                    <img 
                                        src={category.image}
                                        alt={category.name} 
                                        className="w-full h-full object-contain relative z-10" 
                                    />
                                </div>
                            </div>
                            <span className="text-sm font-bold uppercase tracking-widest text-secondary">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopCategoriesSection;

