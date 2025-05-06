import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../redux/api/ProductApiSlice.js";
import Navigation from "./Navigation.jsx";

const AllProducts = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterBrand, setFilterBrand] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const { data: products = [], isLoading, isError } = useAllProductsQuery();

    if (isLoading) return <div className="text-center mt-10 text-xl">Loading...</div>;
    if (isError) return <div className="text-center mt-10 text-xl text-red-500">Error loading products</div>;

    // Filter products based on search criteria
    const filteredProducts = products.filter(product => {
        const matchesSearch = !searchTerm || 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesBrand = !filterBrand || 
            product.brand.toLowerCase() === filterBrand.toLowerCase();
        
        const matchesMinPrice = !minPrice || product.price >= parseFloat(minPrice);
        const matchesMaxPrice = !maxPrice || product.price <= parseFloat(maxPrice);
        
        return matchesSearch && matchesBrand && matchesMinPrice && matchesMaxPrice;
    });

    // List of popular brands
    const brands = [
        "RayBan", "Oakley", "Persol", "Gucci", "Prada", "Tom Ford", "Warby Parker", "Maui Jim",
        "Carrera", "Versace", "Michael Kors", "Armani Exchange", "Fendi", "Chanel", "Burberry",
        "Dior", "Costa Del Mar", "Oliver Peoples", "Police", "Bvlgari"
    ];

    return (
        <>
        <Navigation/>
            <div className="container mx-auto px-4 mt-8 ml-16 mr-32">
                <div className="text-center mb-6">
                    <h1 className="text-lg font-bold text-gray-800">All Products</h1>
                    <p className="text-gray-500 mt-1 text-xs">Manage your inventory efficiently</p>
                </div>

                {/* Search and Filter UI */}
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search by Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-1 border border-gray-300 rounded w-44 focus:outline-none focus:ring focus:ring-blue-200 text-xs"
                    />

                    <select
                        value={filterBrand}
                        onChange={(e) => setFilterBrand(e.target.value)}
                        className="p-1 border border-gray-300 rounded w-40 focus:outline-none focus:ring focus:ring-blue-200 text-xs"
                    >
                        <option value="">Select Brand</option>
                        {brands.map((brand) => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>

                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="p-1 border border-gray-300 rounded w-20 focus:outline-none focus:ring focus:ring-blue-200 text-xs"
                    />

                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="p-1 border border-gray-300 rounded w-20 focus:outline-none focus:ring focus:ring-blue-200 text-xs"
                    />
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-4 gap-x-8 gap-y-6">
                    {filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-lg shadow-sm overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-md"
                        >
                            <Link to={`/product/update/${product._id}`}>
                                <div className="w-full h-36 bg-gray-100 overflow-hidden flex justify-center items-center">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover object-center"
                                    />
                                </div>
                                <div className="p-2">
                                    <h2 className="text-xs font-semibold text-gray-800">{product?.name}</h2>
                                    <p className="text-xs text-gray-500 mt-1 mb-1">
                                        {moment(product.createdAt).format("MMM Do YYYY")}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs font-bold text-green-700">${product?.price}</p>
                                        <span className="text-xs text-gray-500">Stock: {product?.quantity}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AllProducts;
