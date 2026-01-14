import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Home } from 'lucide-react';
import orderService from '../services/orderService';

const OrderSuccess = () => {
    const { orderId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            if (orderId) {
                try {
                    const response = await orderService.getOrderById(orderId);
                    if (response.success) {
                        setOrder(response.data.order);
                    }
                } catch (error) {
                    console.error('Error fetching order:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    const orderNumber = order?.orderNumber || location.state?.orderNumber;
    const totalAmount = order?.pricing?.totalAmount || location.state?.totalAmount;

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-32 text-center">
                <p>Loading order details...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-2xl mx-auto text-center">
                <div className="mb-8">
                    <CheckCircle size={80} className="mx-auto text-green-500 mb-4" />
                    <h1 className="text-4xl font-bold uppercase tracking-widest mb-4">Order Confirmed!</h1>
                    <p className="text-gray-600 text-lg">
                        Thank you for your purchase. Your order has been received and is being processed.
                    </p>
                </div>

                <div className="bg-accent p-8 rounded-2xl mb-8">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Package size={24} className="text-primary" />
                        <h2 className="text-xl font-bold uppercase tracking-widest">Order Details</h2>
                    </div>
                    
                    {orderNumber && (
                        <div className="space-y-4 text-left">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Order Number:</span>
                                <span className="font-bold">{orderNumber}</span>
                            </div>
                            {totalAmount && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Amount:</span>
                                    <span className="font-bold text-primary">PKR {parseFloat(totalAmount).toLocaleString()}</span>
                                </div>
                            )}
                            {order?.status && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Status:</span>
                                    <span className="font-bold capitalize">{order.status}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <p className="text-gray-600">
                        You will receive an email confirmation shortly with your order details.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => navigate('/')}
                            className="btn-primary flex items-center gap-2"
                        >
                            <Home size={20} />
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;

