import React , { useState }from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/order/ordersApi';
import { useNavigate } from 'react-router-dom';




const OrderPage = () => {
    // const[email, setEmail] = useState("");
    // const[submittedEmail, setSubmittedEmail] = useState(null);
    //const { currentUser} = useAuth();
    const navigate =  useNavigate();

    const{data: orders = [], isLoading, isError} = useGetOrderByEmailQuery("test@gmail.com");
    
    if(isLoading) return <div>Loading...</div>;
    if(isError) return <div>Error getting order</div>;
  return (
    <div className='container mx-auto p-6'>
    <h2 className='text-2xl font-semibold mb-4'>Your Orders</h2>
    { orders.length === 0 ? (<div>No orders found!</div>) : (<div>
            {
                orders.map((order, index) => (
                    <div key={order._id} className="border-b mb-4 pb-4">
                        <p className='p-1 bg-secondary text-white w-10 rounded mb-1'># {index + 1}</p>
                        <h2 className="font-bold">Order ID: {order._id}</h2>
                        <p className="text-gray-600">Name: {order.name}</p>
                        <p className="text-gray-600">Email: {order.email}</p>
                        <p className="text-gray-600">Phone: {order.phone}</p>
                        <p className="text-gray-600">Total Price: ${order.totalPrice}</p>
                        <h3 className="font-semibold mt-2">Address: {order.address}</h3>
                        <h3 className="font-semibold mt-2">Products Id:</h3>
                        <ul>
                            {order.productIds.map((productId) => (
                                <li key={productId}>{productId}</li>
                            ))}
                            <button
                                onClick={() => navigate(`/invoice/${order._id}`)}
                                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                                Invoice
                            </button>
                        </ul>
                    </div>
                ))
            }
        </div>)
        
    }
     
</div>
  );
}

export default OrderPage;
