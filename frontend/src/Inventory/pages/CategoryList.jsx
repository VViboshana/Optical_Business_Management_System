import React, { useState } from "react";
import {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoriesQuery,
} from '../redux/api/CategoryApiSlice.js';
import { toast } from "react-toastify";
import CategoryForm from "../components/CategoryForm.jsx";
import CategoryPopUp from "../components/CategoryPopUp.jsx";
import ConfirmationModal from "../components/ConfirmationModel.jsx";
import Navigation from "./Navigation.jsx";

const CategoryList = () => {
    const [name, setName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updatingName, setUpdatingName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const { 
        data: categories = [], 
        isLoading, 
        isError, 
        error 
    } = useFetchCategoriesQuery();

    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const handleCreateCategory = async (e) => {
        e.preventDefault();

        // Validation: Ensure category name is not empty
        if (!name) {
            toast.error("Category name is required");
            return;
        }

        try {
            const result = await createCategory({ name }).unwrap();
            if (result.error) {
                toast.error(result.error);
            } else {
                setName("");
                toast.success(`${result.name} is created.`);
            }
        } catch (error) {
            console.error(error);
            toast.error("Creating category failed, try again.");
        }
    };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        if (!updatingName) {
            toast.error("Category name is required");
            return;
        }

        try {
            console.log('Updating category:', {
                categoryId: selectedCategory._id,
                updatingName
            });
            const result = await updateCategory({
                updatedCategory: { name: updatingName },
                categoryId: selectedCategory._id,
            }).unwrap();

            console.log('Update category response:', result);
            if (result.error) {
                toast.error(result.error);
            } else {
                setModalVisible(false);
                toast.success(`${result.name} is updated.`);
            }
        } catch (error) {
            console.error('Update category error:', error);
            toast.error(error?.data?.message || "Updating category failed, try again.");
        }
    };

    const handleDeleteCategory = async () => {
        if (!selectedCategory?._id) {
            toast.error("No category selected for deletion");
            return;
        }

        try {
            console.log('Deleting category:', selectedCategory._id);
            const result = await deleteCategory(selectedCategory._id).unwrap();
            console.log('Delete category response:', result);
            if (result.error) {
                toast.error(result.error);
            } else {
                setConfirmationVisible(false);
                setSelectedCategory(null);
                toast.success(`Category deleted successfully`);
            }
        } catch (error) {
            console.error('Delete category error:', error);
            toast.error(error?.data?.message || "Failed to delete category. Please try again.");
        }
    };

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>Error loading categories: {error?.data?.message || 'Unknown error'}</p>
                </div>
            </div>
        );
    }

    return (
        <>
        <Navigation/>
        <div className="container mx-auto px-4 py-8 pl-32">
            <h1 className="text-3xl font-bold mb-8">Category Management</h1>

            {/* Add New Category Form */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
                <form onSubmit={handleCreateCategory} className="flex gap-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter category name"
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                    >
                        Add Category
                    </button>
                </form>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((category) => (
                    <div
                        key={category._id}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setUpdatingName(category.name);
                                    setModalVisible(true);
                                }}
                                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setConfirmationVisible(true);
                                }}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <CategoryPopUp
                isOpen={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleUpdateCategory}
                value={updatingName}
                setValue={setUpdatingName}
            />

            <ConfirmationModal
                isOpen={confirmationVisible}
                onClose={() => setConfirmationVisible(false)}
                onConfirm={handleDeleteCategory}
                title="Delete Category"
                message={`Are you sure you want to delete ${selectedCategory?.name}?`}
            />
        </div>
        </>
    );
};

export default CategoryList;
