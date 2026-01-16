import React from 'react';
import { Truck, ShieldCheck, RotateCcw } from 'lucide-react';

const OurBrandSection = () => {
    return (
        <section className="bg-white py-12 md:py-16 shadow-md mb-[1px]">
            <div className="container mx-auto px-4">
                {/* Main Content - Image and Text */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
                    {/* Left Side - Image */}
                    <div className="order-2 lg:order-1">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden">
                            <img
                                src="/public/images/ourbrand.webp"
                                alt="Our Brand"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Side - Text Content */}
                    <div className="order-1 lg:order-2 flex flex-col justify-center">
                        {/* OUR BRAND Badge */}
                        <div className="mb-6">
                            <span className="inline-block bg-[#FDE7F3] text-secondary px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">
                                OUR BRAND
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6 leading-tight">
                            Art · Beauty · Joy
                        </h2>

                        {/* Description */}
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-lg">
                            KIKO MILANO is a brand built for self-expression. We capture global trends and infuse them with our own distinctive style drawn from our Italian perspective before sharing them with our audience across the world.
                        </p>
                    </div>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {/* Free Shipping */}
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <Truck size={32} className="text-secondary" strokeWidth={1.5} />
                        </div>
                        <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-secondary">
                            FREE SHIPPING FOR ORDERS OVER 5000PKR
                        </h4>
                    </div>

                    {/* Secure Payments */}
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <ShieldCheck size={32} className="text-secondary" strokeWidth={1.5} />
                        </div>
                        <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-secondary">
                            SECURE PAYMENTS PURCHASES ARE SECURE AND GUARANTEED
                        </h4>
                    </div>

                    {/* Easy Exchange */}
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <RotateCcw size={32} className="text-secondary" strokeWidth={1.5} />
                        </div>
                        <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-secondary">
                            EASY EXCHANGE UP TO 7 DAYS AFTER ORDER DELIVERY
                        </h4>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurBrandSection;

