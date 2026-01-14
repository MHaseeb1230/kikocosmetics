import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    return (
        <Link
            to={`/category/${category.slug || category.id}`}
            className="group relative overflow-hidden block aspect-[4/5]"
        >
            <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold uppercase tracking-widest border-2 border-white px-6 py-2">
                    {category.name}
                </h3>
            </div>
        </Link>
    );
};

export default CategoryCard;
