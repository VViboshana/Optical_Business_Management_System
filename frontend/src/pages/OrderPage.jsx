import React from 'react';
import { useGetOrderByEmailQuery, useUpdateOrderStatusMutation } from '../Inventory/redux/features/order/ordersApi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const OrderPage = () => {
    const navigate = useNavigate();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(sessionStorage.getItem("userEmail"));
    const [updateOrderStatus] = useUpdateOrderStatusMutation();

    const handleConfirmDelivery = async (orderId) => {
        try {
            await updateOrderStatus(orderId).unwrap();
            Swal.fire({
                title: "Delivery Confirmed",
                text: "Thank you for confirming the delivery!",
                icon: "success",
            });
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Failed to confirm delivery",
                icon: "error",
            });
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error getting order</div>;

    return (
        <div className='container mx-auto p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Your Orders</h2>
            {orders.length === 0 ? (
                <div>No orders found!</div>
            ) : (
                <div>
                    {orders.map((order, index) => (
                        <div key={order._id} className="border rounded-lg p-6 mb-4 bg-white shadow-sm">
                            <p className='p-1 bg-secondary text-white w-10 rounded mb-1'>#{index + 1}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-600">Name: {order.name}</p>
                                    <p className="text-gray-600">Email: {order.email}</p>
                                    <p className="text-gray-600">Phone: {order.phone}</p>
                                    <p className="text-gray-600">Total Price: ${order.totalPrice}</p>
                                    <p className="text-gray-600">Address: {order.address}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">
                                        Status: <span className={`font-semibold ${order.status === 'Delivered' ? 'text-green-600' : 'text-orange-600'}`}>
                                            {order.status}
                                        </span>
                                    </p>
                                    <p className="text-gray-600">Expected Delivery: {formatDate(order.deliveryDate)}</p>
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => navigate(`/invoice/${order._id}`)}
                                            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary transition duration-300">
                                            Invoice
                                        </button>
                                        {order.status === 'Processing' && (
                                            <button
                                                onClick={() => handleConfirmDelivery(order._id)}
                                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300">
                                                Confirm Delivery
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrderPage;
