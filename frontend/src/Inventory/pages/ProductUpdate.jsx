import React from "react";
import { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom"
import {useUpdateProductMutation, useDeleteProductMutation, useGetProductByIdQuery, useUploadProductImageMutation} from "../redux/api/ProductApiSlice.js"
import {useFetchCategoriesQuery} from "../redux/api/CategoryApiSlice.js"
import {toast} from "react-toastify"
import ConfirmationModal from "../components/ConfirmationModel.jsx";
import { FaEdit, FaTrash, FaImage, FaExclamationTriangle } from "react-icons/fa";
import Navigation from "./Navigation.jsx";

const ProductUpdate = () => {
    const params = useParams();
    const navigate = useNavigate();

    const { data: productData, isLoading: isLoadingProduct, error: productError } = useGetProductByIdQuery(params._id);
    
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [stock, setStock] = useState("");
    const [quantity, setQuantity] = useState("");
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {data: categories = [], isLoading: isLoadingCategories } = useFetchCategoriesQuery();

    const [uploadProductImage, {isLoading: isUploading}] = useUploadProductImageMutation();
    const [updateProduct, {isLoading: isUpdating}] = useUpdateProductMutation();
    const [deleteProduct, {isLoading: isDeleting}] = useDeleteProductMutation();

    useEffect(() => {
        if (productData && productData._id) {
            setImage(productData.image);
            setName(productData.name);
            setDescription(productData.description);
            setPrice(productData.price);
            setCategory(productData.category?._id || productData.category);
            setQuantity(productData.quantity);
            setBrand(productData.brand);
            setStock(productData.countInStock);
        }
    }, [productData]);

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        const file = e.target.files[0];
        
        if (!file) return;
        
        // Simple validation for file type
        const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
        if (!validImageTypes.includes(file.type)) {
            toast.error("Please upload a valid image file (jpg, jpeg, png, webp)");
            return;
        }
        
        formData.append("image", file);
        
        try {
            toast.info("Uploading image...", { autoClose: 1000 });
            const res = await uploadProductImage(formData).unwrap();
            toast.success("Image uploaded successfully");
            setImage(res.image);
        } catch (err) {
            toast.error(err?.data?.message || "Failed to upload image");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Form validation
        if (!name || !description || !price || !category || !quantity || !brand) {
            toast.error("Please fill in all required fields");
            return;
        }
        
        if (!image) {
            toast.error("Please upload a product image");
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("quantity", quantity);
            formData.append("brand", brand);
            formData.append("countInStock", stock);
    
            const data = await updateProduct({ productId: params._id, formData }).unwrap();
            
            toast.success("Product updated successfully");
            navigate("/allProductList");
            
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || "Product update failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        try {
            setIsSubmitting(true);
            await deleteProduct(params._id).unwrap();
            toast.success("Product deleted successfully");
            setConfirmDelete(false);
            navigate("/allProductList");
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || "Failed to delete product");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // Show loading state
    if (isLoadingProduct) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="mt-4 text-lg font-medium text-gray-700">Loading product details...</span>
                </div>
            </div>
        );
    }
    
    // Show error state
    if (productError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-red-50 p-6 rounded-lg shadow-sm max-w-md text-center">
                    <FaExclamationTriangle className="mx-auto text-red-500 text-3xl mb-3" />
                    <h2 className="text-xl font-semibold text-red-700 mb-2">Failed to load product</h2>
                    <p className="text-red-600 mb-4">
                        {productError?.data?.message || "Could not load the product details. The product might have been deleted or there was a server error."}
                    </p>
                    <button
                        onClick={() => navigate('/allProductList')}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
        <Navigation/>
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {productData?.name ? `Update Product: ${productData.name}` : 'Update Product'}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Update product information or delete the product</p>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        {/* Image Upload Section */}
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Product Image</h3>
                            <div className="flex flex-col md:flex-row gap-6 items-center">
                                {image && (
                                    <div className="relative">
                                        <img
                                            src={image}
                                            alt={name || "Product"}
                                            className="w-40 h-40 object-cover rounded-lg border border-gray-200"
                                        />
                                    </div>
                                )}
                                
                                <div className="flex-1">
                                    <label className="block w-full text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-lg cursor-pointer hover:from-orange-600 hover:to-orange-700 shadow-sm transition-all">
                                        <FaImage className="inline-block mr-2" />
                                        {image ? 'Change Image' : 'Upload Image'}
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={uploadFileHandler}
                                            className="hidden"
                                        />
                                    </label>
                                    
                                    <p className="text-xs text-gray-500 mt-2 text-center">
                                        Recommended size: 800x800 pixels. Max size: 2MB.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Product Information Section */}
                        <div className="p-6 space-y-6">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Product Information</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="text-gray-700 font-medium block mb-2 text-sm">
                                        Product Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="price" className="text-gray-700 font-medium block mb-2 text-sm">
                                        Price <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-gray-500">$</span>
                                        <input
                                            type="number"
                                            id="price"
                                            className="w-full p-3 pl-7 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            step="0.01"
                                            min="0"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="quantity" className="text-gray-700 font-medium block mb-2 text-sm">
                                        Quantity <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        min="0"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="brand" className="text-gray-700 font-medium block mb-2 text-sm">
                                        Brand <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="brand"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="stock" className="text-gray-700 font-medium block mb-2 text-sm">
                                        Count In Stock <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="stock"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                        min="0"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="category" className="text-gray-700 font-medium block mb-2 text-sm">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="category"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    onChange={(e) => setCategory(e.target.value)}
                                    value={category}
                                    required
                                >
                                    <option value="" disabled>Select a category</option>
                                    {isLoadingCategories ? (
                                        <option value="" disabled>Loading categories...</option>
                                    ) : (
                                        categories?.map((c) => (
                                            <option key={c._id} value={c._id}>
                                                {c.name}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>
                            
                            <div>
                                <label htmlFor="description" className="text-gray-700 font-medium block mb-2 text-sm">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="4"
                                    required
                                ></textarea>
                                <p className="text-xs text-gray-500 mt-1">
                                    Provide a detailed description of your product.
                                </p>
                            </div>
                            
                            {/* Button Section */}
                            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    <FaEdit className="mr-2" />
                                    {isUpdating ? 'Updating...' : 'Update Product'}
                                </button>
                                
                                <button
                                    type="button"
                                    onClick={() => setConfirmDelete(true)}
                                    disabled={isSubmitting}
                                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    <FaTrash className="mr-2" />
                                    {isDeleting ? 'Deleting...' : 'Delete Product'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={confirmDelete}
                onClose={() => setConfirmDelete(false)}
                onConfirm={handleDelete}
                title="Confirm Product Deletion"
                message={`Are you sure you want to delete "${name}"? This action cannot be undone.`}
            />
        </div>
        </>
    );
};

export default ProductUpdate;