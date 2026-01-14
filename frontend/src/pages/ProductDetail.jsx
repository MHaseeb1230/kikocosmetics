import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../services/productService';
import { useCart } from '../context/CartContext';
import QuantitySelector from '../components/QuantitySelector';
import ProductCard from '../components/ProductCard';
import { Heart, Share2, ShieldCheck, Truck, RotateCcw, Package, MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductDetail = () => {
    const { slug } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [selectedSwatch, setSelectedSwatch] = useState(null);
    const [activeTab, setActiveTab] = useState('description');
    const [selectedImage, setSelectedImage] = useState(0);

    // Fetch product from backend
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await productService.getProductBySlug(slug);
                if (response.success) {
                    setProduct(response.data);
                    setSelectedSwatch(response.data.swatches?.[0]);
                    
                    // Fetch related products
                    const relatedResponse = await productService.getProducts({ 
                        category: response.data.category?.slug,
                        limit: 5 
                    });
                    if (relatedResponse.success) {
                        setRelatedProducts(
                            relatedResponse.data.products
                                .filter(p => p.id !== response.data.id)
                                .slice(0, 4)
                        );
                    }
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        
        if (slug) {
            fetchProduct();
        }
    }, [slug]);

    // Scroll to top when component mounts or product changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) {
        return <div className="container mx-auto px-4 py-20 text-center">Loading...</div>;
    }

    if (!product) {
        return <div className="container mx-auto px-4 py-20 text-center">Product not found</div>;
    }

    const tabs = [
        { id: 'description', label: 'DESCRIPTION' },
        { id: 'results', label: 'RESULTS' },
        { id: 'advice', label: 'ADVICE' },
        { id: 'ingredients', label: 'INGREDIENTS' }
    ];

    return (
        <div className="bg-[var(--color-bg-light)] min-h-screen">
            {/* Top Section - Product Details */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left - Product Title & Thumbnails */}
                    <div className='flex justify-center items-center lg:col-span-3'>
                    <div className="lg:col-span-3 order-1 gap-4">
                        <h1 className="text-3xl lg:text-4xl font-light mb-8 leading-tight">
                            {product.name}
                        </h1>
                        
                        {/* Thumbnail Images */}
                        <div className="flex  gap-4">
                            {[0, 1].map(i => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={`w-16 h-16 lg:w-20 lg:h-20 bg-primary rounded-lg overflow-hidden border-2 transition-all ${
                                        selectedImage === i ? 'border-primary' : 'border-transparent'
                                    }`}
                                >
                                    <img src={product.image} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>
                    </div>
                    {/* Center - Main Product Image */}
                    <div className="lg:col-span-5 order-2 lg:order-2">
                        <div className="aspect-square bg-brand-primary overflow-hidden rounded-2xl">
                            <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
                        </div>
                    </div>

                    {/* Right - Product Info & Purchase */}
                    <div className="lg:col-span-4 order-3 bg-white rounded-2xl p-6 lg:p-8 h-fit sticky top-4">
                        {/* Shade Selector */}
                        {product.swatches && product.swatches.length > 0 && (
                            <div className="mb-6 pb-6 border-b border-[var(--color-border)]">
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-sm font-semibold">01 Warm Rose</p>
                                    <button className="text-xs text-[var(--color-text-secondary)] hover:text-primary">
                                        All Shades ({product.swatches.length})
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    {product.swatches.map((swatch, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedSwatch(swatch)}
                                            className={`w-10 h-10 rounded-full border-2 transition-all ${
                                                selectedSwatch === swatch ? 'border-secondary scale-110' : 'border-[var(--color-border)]'
                                            }`}
                                            style={{ backgroundColor: swatch }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Price */}
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl font-bold text-secondary">
                                    PKR {product.price.toLocaleString()}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-lg text-[var(--color-text-light)] line-through">
                                        PKR {product.originalPrice.toLocaleString()}
                                    </span>
                                )}
                            </div>
                            
                            {/* Payment Options */}
                            <div className="bg-purple-100 text-purple-800 px-3 py-2 rounded text-xs font-semibold inline-flex items-center gap-2">
                                <span>💳</span>
                                Top Rated Seller Product
                            </div>
                        </div>

                        {/* Add to Bag Button */}
                        <div className='flex justify-between items-center gap-5'>
                        <button
                            onClick={() => addToCart(product, quantity)}
                            className="w-full bg-secondary text-white py-[13px] rounded-lg font-bold uppercase tracking-wider hover:bg-primary hover:text-secondary transition-all"
                        >
                            ADD TO BAG
                        </button>

                        {/* Wishlist Button */}
                        
                        <button className="w-20 border-2 border-[var(--color-border)] py-3 rounded-lg hover:border-primary transition-colors flex items-center justify-center gap-2">
                            <Heart size={20} />
                        </button>
                        </div>
                        {/* Store Availability */}
                        <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
                            <button className="w-full text-left text-sm font-semibold text-secondary hover:text-primary transition-colors flex justify-between items-center">
                                <span>STORE AVAILABILITY</span>
                                <span className="text-xs underline">Change store</span>
                            </button>
                            <p className="text-xs text-[var(--color-text-secondary)] mt-2">
                                Check if this product is available in your favourite store
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className='text-5xl col-span-3 hidden lg:block'>
                    <div className='container text-right pr-2'>{product.name}</div>
                </div>
                <div className="container col-span-8 px-4">
                    {/* Tab Headers */}
                    <div className="border-b border-[var(--color-border)]">
                        <div className="flex gap-8 overflow-x-auto ">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-4 px-2 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                                        activeTab === tab.id
                                            ? 'text-secondary border-b-2 border-secondary'
                                            : 'text-[var(--color-text-secondary)] hover:text-secondary'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="py-6">
                        <div className="max-w-4xl">
                            {activeTab === 'description' && (
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-light mb-6">
                                        {product.name}
                                    </h2>
                                    <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
                                        {product.description}
                                    </p>
                                    
                                    {/* Product Features */}
                                    {product.features && product.features.length > 0 && (
                                        <div className="space-y-4 mt-8">
                                            {product.features.map((feature, index) => (
                                                <div key={index} className="space-y-2">
                                                    <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
                                                        <strong className="text-secondary">{feature.title}:</strong> {feature.description}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {product.spf && (
                                        <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
                                            <strong className="text-secondary">Sun Protection:</strong> {product.spf}
                                        </p>
                                    )}
                                </div>
                            )}

                            {activeTab === 'ingredients' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold uppercase tracking-wider text-secondary mb-6">
                                        Key Ingredients
                                    </h2>
                                    {product.keyIngredients && product.keyIngredients.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {product.keyIngredients.map((ingredient, index) => (
                                                <div key={index} className="flex items-start gap-3 p-4 bg-pink-light rounded-lg">
                                                    <span className="text-primary font-bold">•</span>
                                                    <p className="text-sm text-secondary font-medium">{ingredient}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-[var(--color-text-secondary)]">No ingredient information available.</p>
                                    )}
                                </div>
                            )}

                            {activeTab === 'results' && (
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold uppercase tracking-wider text-secondary mb-6">
                                        Results
                                    </h2>
                                    <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
                                        Experience visible results with regular use. This product is dermatologically tested and suitable for daily application.
                                    </p>
                                </div>
                            )}

                            {activeTab === 'advice' && (
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold uppercase tracking-wider text-secondary mb-6">
                                        How to Use
                                    </h2>
                                    <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
                                        Apply evenly to face and neck. For best results, use daily as part of your skincare routine.
                                    </p>
                                    {product.spf && (
                                        <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
                                            <strong>Sun Protection:</strong> Reapply every 2 hours when exposed to direct sunlight for optimal protection.
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Specifications */}
            <div className="grid lg:grid-cols-12 bg-[var(--color-bg-light)] py-12">
                <div className='col-span-3 hidden lg:block'>
                    <div className='container text-right pr-2'></div>
                </div>
<div className=" lg:col-span-8">
                   <div className="max-w-4xl grid grid-cols-3 gap-4 md:gap-8">
                       {product.volume && (
                           <div className="flex flex-col items-center text-center gap-2 md:gap-3">
                               <Package size={24} className="text-secondary md:w-8 md:h-8" />
                               <p className="text-xs md:text-lg font-bold text-secondary">{product.volume}</p>
                           </div>
                       )}
                       <div className="flex flex-col items-center text-center gap-2 md:gap-3">
                           <MapPin size={24} className="text-secondary md:w-8 md:h-8" />
                           <p className="text-[10px] md:text-sm font-semibold uppercase tracking-wider text-secondary">MADE IN ITALY</p>
                       </div>
                       <div className="flex flex-col items-center text-center gap-2 md:gap-3">
                           <Calendar size={24} className="text-secondary md:w-8 md:h-8" />
                           <p className="text-[10px] md:text-sm font-semibold uppercase tracking-wider text-secondary">12 MONTHS</p>
                       </div>
                   </div>
               </div>
            </div>

            {/* You might also like Section */}
            <div className="bg-[var(--color-bg-light)] py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-4xl font-light uppercase tracking-widest text-center mb-8 md:mb-12">
                        You might also like
                    </h2>
                    
                    {/* Products Grid */}
                    <div className="relative">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {relatedProducts && relatedProducts.length > 0 ? (
                                relatedProducts.map(relatedProduct => (
                                    <ProductCard key={relatedProduct.id} product={relatedProduct} />
                                ))
                            ) : (
                                <p className="col-span-4 text-center text-gray-500">No related products available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductDetail;
