import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import productService from '../services/productService';

// Static images for What's New section
const whatsNewImages = [
    {
        mainImage: '/images/whatsnew/whatsnew_main.webp',
        smallImage1: '/images/whatsnew/whatsnew_1.webp',
        smallImage2: '/images/whatsnew/whatsnew_2.webp',
        thumbnail: '/images/whatsnew/whatsnew_1.webp'
    },
    {
        mainImage: '/images/whatsnew/whatsnew_main.webp',
        smallImage1: '/images/whatsnew/whatsnew_1.webp',
        smallImage2: '/images/whatsnew/whatsnew_2.webp',
        thumbnail: '/images/whatsnew/whatsnew_2.webp'
    },
    {
        mainImage: '/images/whatsnew/whatsnew_main.webp',
        smallImage1: '/images/whatsnew/whatsnew_1.webp',
        smallImage2: '/images/whatsnew/whatsnew_2.webp',
        thumbnail: '/images/whatsnew/whatsnew_main.webp'
    }
];

const WhatsNewSection = () => {
    const [whatsNewProducts, setWhatsNewProducts] = useState([]);
    const [selectedNewProduct, setSelectedNewProduct] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNewProducts = async () => {
            try {
                setLoading(true);
                
                // Fetch new products from backend (last 30 days)
                const newProductsResponse = await productService.getNewProducts(3);
                
                if (newProductsResponse.success && newProductsResponse.data.products.length > 0) {
                    // Transform products into the format needed for "What's New" section
                    const transformedNewProducts = newProductsResponse.data.products.map((product, index) => {
                        // Split product name into lines (max 2-3 lines with multiple words per line)
                        const nameWords = product.name.split(' ');
                        let title;
                        if (nameWords.length <= 3) {
                            // If 3 or fewer words, keep on one line
                            title = product.name;
                        } else if (nameWords.length <= 6) {
                            // If 4-6 words, split into 2 lines
                            const midPoint = Math.ceil(nameWords.length / 2);
                            title = nameWords.slice(0, midPoint).join(' ') + '\n' + nameWords.slice(midPoint).join(' ');
                        } else {
                            // If more than 6 words, split into 3 lines
                            const line1End = Math.ceil(nameWords.length / 3);
                            const line2End = Math.ceil((nameWords.length - line1End) / 2) + line1End;
                            title = nameWords.slice(0, line1End).join(' ') + '\n' + 
                                   nameWords.slice(line1End, line2End).join(' ') + '\n' + 
                                   nameWords.slice(line2End).join(' ');
                        }
                        
                        // Use static images from whatsnew folder, cycling through available images
                        const imageSet = whatsNewImages[index % whatsNewImages.length];
                        
                        return {
                            id: product.id,
                            title: title || product.name,
                            description: product.description || `Discover the new ${product.name}`,
                            mainImage: imageSet.mainImage,
                            smallImage1: imageSet.smallImage1,
                            smallImage2: imageSet.smallImage2,
                            thumbnail: imageSet.thumbnail,
                            slug: product.slug
                        };
                    });
                    
                    setWhatsNewProducts(transformedNewProducts);
                } else {
                    // Fallback: fetch regular products if no new products found
                    const allProductsResponse = await productService.getProducts({ limit: 3, sortBy: 'created_at', sortOrder: 'DESC' });
                    
                    if (allProductsResponse.success && allProductsResponse.data.products.length > 0) {
                        const fallbackProducts = allProductsResponse.data.products.map((product, index) => {
                            // Split product name into lines (max 2-3 lines with multiple words per line)
                            const nameWords = product.name.split(' ');
                            let title;
                            if (nameWords.length <= 3) {
                                // If 3 or fewer words, keep on one line
                                title = product.name;
                            } else if (nameWords.length <= 6) {
                                // If 4-6 words, split into 2 lines
                                const midPoint = Math.ceil(nameWords.length / 2);
                                title = nameWords.slice(0, midPoint).join(' ') + '\n' + nameWords.slice(midPoint).join(' ');
                            } else {
                                // If more than 6 words, split into 3 lines
                                const line1End = Math.ceil(nameWords.length / 3);
                                const line2End = Math.ceil((nameWords.length - line1End) / 2) + line1End;
                                title = nameWords.slice(0, line1End).join(' ') + '\n' + 
                                       nameWords.slice(line1End, line2End).join(' ') + '\n' + 
                                       nameWords.slice(line2End).join(' ');
                            }
                            
                            // Use static images from whatsnew folder, cycling through available images
                            const imageSet = whatsNewImages[index % whatsNewImages.length];
                            
                            return {
                                id: product.id,
                                title: title || product.name,
                                description: product.description || `Discover the new ${product.name}`,
                                mainImage: imageSet.mainImage,
                                smallImage1: imageSet.smallImage1,
                                smallImage2: imageSet.smallImage2,
                                thumbnail: imageSet.thumbnail,
                                slug: product.slug
                            };
                        });
                        setWhatsNewProducts(fallbackProducts);
                    }
                }
            } catch (error) {
                console.error('Error fetching new products:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchNewProducts();
    }, []);

    if (loading) {
        return null; // Don't show anything while loading
    }

    if (whatsNewProducts.length === 0) {
        return null; // Don't show section if no products
    }

    return (
        <section className="bg-white py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Side - Content */}
                    <div className="flex flex-col text-center ">
                        {/* Heading */}
                        <h2 className="text-sm md:text-base font-light uppercase tracking-[0.2em] text-gray-600 mb-8 w-full">
                            What's new
                        </h2>
                        
                        {/* Circular Thumbnails */}
                        <div className="flex gap-3 mb-10 w-full justify-center ">
                            {whatsNewProducts.map((product, idx) => (
                                <button
                                    key={product.id}
                                    onClick={() => setSelectedNewProduct(idx)}
                                    className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${
                                        selectedNewProduct === idx 
                                            ? 'border-gray-900 scale-110 shadow-md' 
                                            : 'border-gray-300 hover:border-gray-500'
                                    }`}
                                >
                                    <img
                                        src={product.thumbnail}
                                        alt={`Product ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Product Title */}
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-tight text-gray-900 mb-6 whitespace-pre-line leading-[1.1] w-full">
                            {whatsNewProducts[selectedNewProduct]?.title.split('\n').map((line, idx) => (
                                <React.Fragment key={idx}>
                                    {idx === 0 || idx === 1 ? (
                                        <strong className="font-semibold">{line}</strong>
                                    ) : (
                                        <span className="font-light">{line}</span>
                                    )}
                                    {idx < whatsNewProducts[selectedNewProduct].title.split('\n').length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </h3>

                        {/* Product Description */}
                        <p className="text-sm md:text-base mx-auto max-w-xl text-gray-700 mb-8 text-center leading-relaxed w-full">
                            {whatsNewProducts[selectedNewProduct]?.description}
                        </p>

                        {/* Button */}
                        <Link 
                            to={whatsNewProducts[selectedNewProduct]?.slug ? `/product/${whatsNewProducts[selectedNewProduct].slug}` : "/category/new"} 
                            className="inline-block border border-gray-900 bg-white text-gray-900 px-6 py-3 uppercase w-auto mx-auto text-xs font-bold tracking-wider hover:bg-gray-50 transition-colors"
                        >
                            DISCOVER THE COLLECTION
                        </Link>
                    </div>

                    {/* Right Side - Images */}
                    <div className="flex flex-col gap-4 lg:gap-6">
                        {/* Main Big Image */}
                        <div className="relative w-full  overflow-hidden rounded-lg">
                            <motion.img
                                key={selectedNewProduct}
                                src={whatsNewProducts[selectedNewProduct]?.mainImage}
                                alt={whatsNewProducts[selectedNewProduct]?.title}
                                className="w-full object-cover"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>

                        {/* Two Small Images */}
                        <div className="grid grid-cols-2 gap-4 lg:gap-6">
                            <div className="relative w-full  overflow-hidden rounded-lg">
                                <motion.img
                                    key={`small1-${selectedNewProduct}`}
                                    src={whatsNewProducts[selectedNewProduct]?.smallImage1}
                                    alt="Product detail 1"
                                    className="w-full object-cover"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                            <div className="relative w-full  overflow-hidden rounded-lg">
                                <motion.img
                                    key={`small2-${selectedNewProduct}`}
                                    src={whatsNewProducts[selectedNewProduct]?.smallImage2}
                                    alt="Product detail 2"
                                    className="w-full object-cover"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatsNewSection;

