import React from 'react';
import { X } from 'lucide-react';
import QuantitySelector from './QuantitySelector';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();

    const handleRemove = async () => {
        try {
            await removeFromCart(item.id);
        } catch (error) {
            alert('Failed to remove item: ' + (error.message || 'Unknown error'));
        }
    };

    const handleQuantityChange = async (newQuantity) => {
        try {
            await updateQuantity(item.id, newQuantity);
        } catch (error) {
            alert('Failed to update quantity: ' + (error.message || 'Unknown error'));
        }
    };

    return (
        <div className="flex gap-6 py-6 border-b border-gray-100 last:border-0">
            <div className="w-24 h-24 bg-gray-100 flex-shrink-0 rounded-lg overflow-hidden">
                <img src={item.image || item.image_url} alt={item.name || item.product_name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-1">{item.name || item.product_name}</h3>
                        {item.category && (
                            <p className="text-xs text-gray-500 uppercase">{item.category}</p>
                        )}
                    </div>
                    <button
                        onClick={handleRemove}
                        className="text-gray-400 hover:text-primary transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="flex justify-between items-end">
                    <QuantitySelector
                        quantity={item.quantity}
                        onIncrease={() => handleQuantityChange(item.quantity + 1)}
                        onDecrease={() => handleQuantityChange(Math.max(1, item.quantity - 1))}
                    />
                    <div className="text-right">
                        <p className="text-sm font-bold">PKR {((parseFloat(item.price) * item.quantity)).toLocaleString()}</p>
                        <p className="text-[10px] text-gray-400">PKR {parseFloat(item.price).toLocaleString()} each</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
