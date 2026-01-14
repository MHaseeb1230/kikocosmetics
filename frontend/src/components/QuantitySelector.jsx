import React from 'react';
import { Minus, Plus } from 'lucide-react';

const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => {
    return (
        <div className="flex items-center border border-gray-300 rounded-full w-fit">
            <button
                onClick={onDecrease}
                className="p-2 hover:text-primary transition-colors"
            >
                <Minus size={16} />
            </button>
            <span className="px-4 font-bold text-sm min-w-[40px] text-center">{quantity}</span>
            <button
                onClick={onIncrease}
                className="p-2 hover:text-primary transition-colors"
            >
                <Plus size={16} />
            </button>
        </div>
    );
};

export default QuantitySelector;
