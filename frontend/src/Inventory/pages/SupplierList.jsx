import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
    useGetAllSuppliersQuery,
    useDeleteSupplierMutation
} from "../redux/api/SupplierApiSlice";
import { toast } from "react-toastify";
import ConfirmationModal from "../components/ConfirmationModel";
import { FaPlus, FaEdit, FaTrash, FaPhone, FaEnvelope } from "react-icons/fa";
import Navigation from "./Navigation";

const SupplierList = () => {
    const { data, isLoading, isError, error, refetch } = useGetAllSuppliersQuery();
    const suppliers = data || [];
    const [deleteSupplier, { isLoading: isDeleting }] = useDeleteSupplierMutation();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [supplierToDelete, setSupplierToDelete] = useState(null);

    const handleDeleteClick = (supplier) => {
        setSupplierToDelete(supplier);
        setConfirmDelete(true);
    };

    const confirmDeleteSupplier = async () => {
        try {
            await deleteSupplier(supplierToDelete._id).unwrap();
            toast.success(`${supplierToDelete.name} deleted successfully`);
            setConfirmDelete(false);
        } catch (err) {
            toast.error(err?.data?.message || "Error deleting supplier");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="mt-4 text-lg font-medium text-gray-700">Loading suppliers...</span>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-red-50 p-6 rounded-lg shadow-sm">
                    <h3 className="text-red-800 font-medium text-lg">Error loading suppliers</h3>
                    <p className="text-red-600 mt-2">Please try refreshing the page</p>
                </div>
            </div>
        );
    }

    return (
        <>
        <Navigation/>
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Suppliers</h1>
                    <Link
                        to="/supplier/add"
                        className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg flex items-center transition-colors"
                    >
                        <FaPlus className="mr-2" />
                        Add Supplier
                    </Link>
                </div>

                {!isLoading && !isError && suppliers.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <p className="text-gray-500 mb-4">No suppliers found</p>
                        <Link
                            to="/supplier/add"
                            className="inline-block bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors"
                        >
                            Add Your First Supplier
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name (Brand)
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Item
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {suppliers.map((supplier) => (
                                        <tr key={supplier._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{supplier.item}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col text-sm text-gray-500">
                                                    <div className="flex items-center">
                                                        <FaPhone className="mr-2 text-gray-400" />
                                                        {supplier.phoneNumber}
                                                    </div>
                                                    <div className="flex items-center mt-1">
                                                        <FaEnvelope className="mr-2 text-gray-400" />
                                                        {supplier.email}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-3">
                                                    <Link
                                                        to={`/supplier/update/${supplier._id}`}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        <FaEdit className="text-lg" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteClick(supplier)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <FaTrash className="text-lg" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            <ConfirmationModal
                isOpen={confirmDelete}
                onClose={() => setConfirmDelete(false)}
                onConfirm={confirmDeleteSupplier}
                title="Confirm Deletion"
                message={`Are you sure you want to delete ${supplierToDelete?.name}? This action cannot be undone.`}
            />
        </div>
        </>
    );
};

export default SupplierList;
