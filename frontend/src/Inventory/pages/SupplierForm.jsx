import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useCreateSupplierMutation,
    useUpdateSupplierMutation,
    useGetSupplierByIdQuery,
} from "../redux/api/SupplierApiSlice";
import { toast } from "react-toastify";
import Navigation from "./Navigation";

const SupplierForm = () => {
    const { supplierId } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(supplierId);

    // State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        item: "",
        phoneNumber: "",
    });

    // RTK Query hooks
    const { data: supplierData, isLoading: isLoadingSupplier } = useGetSupplierByIdQuery(
        supplierId, 
        { skip: !isEditMode }
    );
    const [createSupplier, { isLoading: isCreating }] = useCreateSupplierMutation();
    const [updateSupplier, { isLoading: isUpdating }] = useUpdateSupplierMutation();

    // Check if any operation is in progress
    const isLoading = isCreating || isUpdating || isLoadingSupplier;

    // Populate form when in edit mode
    useEffect(() => {
        if (isEditMode && supplierData) {
            setFormData({
                name: supplierData.name,
                email: supplierData.email,
                item: supplierData.item,
                phoneNumber: supplierData.phoneNumber,
            });
        }
    }, [isEditMode, supplierData]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Form validation
        if (!formData.name || !formData.email || !formData.item || !formData.phoneNumber) {
            toast.error("All fields are required");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("Please enter a valid email");
            return;
        }

        // Phone number validation (10 digits, no spaces or dashes)
        const phoneRegex = /^[0-9]{10}$/; // Adjust regex if needed
        if (!phoneRegex.test(formData.phoneNumber)) {
            toast.error("Please enter a valid phone number (10 digits without spaces or dashes)");
            return;
        }

        try {
            if (isEditMode) {
                await updateSupplier({
                    supplierId,
                    ...formData,
                }).unwrap();
                toast.success("Supplier updated successfully");
            } else {
                await createSupplier(formData).unwrap();
                toast.success("Supplier added successfully");
            }
            navigate("/suppliers");
        } catch (err) {
            toast.error(err?.data?.message || "Error saving supplier");
        }
    };

    if (isLoadingSupplier) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="mt-4 text-lg font-medium text-gray-700">Loading supplier data...</span>
                </div>
            </div>
        );
    }

    return (
        <>
        <Navigation/>
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-3xl mx-auto px-4">
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isEditMode ? "Update Supplier" : "Add New Supplier"}
                        </h1>
                    </div>
                    
                    <div className="p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Name (Brand) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                        required
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Enter the supplier's brand name. This is used to match products for low stock alerts.</p>
                                </div>
                                
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="item" className="block text-sm font-medium text-gray-700 mb-1">
                                        Item <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="item"
                                        name="item"
                                        value={formData.item}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                        required
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Enter the type of items this supplier provides (e.g., "frames", "lenses", "accessories"). This helps match products for low stock alerts.</p>
                                </div>
                                
                                <div>
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-8 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => navigate("/suppliers")}
                                    className="mr-4 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <span>Saving...</span>
                                    ) : isEditMode ? (
                                        <span>Update Supplier</span>
                                    ) : (
                                        <span>Add Supplier</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default SupplierForm;
