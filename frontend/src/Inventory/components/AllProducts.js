import React, { useState } from 'react';
import { useAllProductsQuery } from '../../Inventory/redux/api/ProductApiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllProducts = () => {
    const navigate = useNavigate();
    const { data: products, isLoading, error } = useAllProductsQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) {
        toast.error('Error loading products');
        return <div>Error loading products</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">All Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-600 mb-2">Price: ${product.price}</p>
                        <p className="text-gray-600 mb-2">Stock: {product.stock}</p>
                        <button
                            onClick={() => navigate(`/product/${product.id}`)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts; 