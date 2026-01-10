import React from 'react';
import mockData from '../data/mockData.js';
import CategoryCard from '../components/CategoryCard';

const CategoryListing = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold uppercase tracking-widest mb-12 text-center">All Categories</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {mockData.categories.map(category => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
};

export default CategoryListing;
