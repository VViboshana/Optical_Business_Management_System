import React, { useEffect } from "react";
import {
  useFetchGlassByIdQuery,
  useUpdateGlassMutation,
} from "../../../redux/features/glasses/glassApi";
import { useForm } from "react-hook-form";
import axios from "axios";
import getBaseURL from "../../../utils/baseURL";
import Loading from "../../../components/Loading";
import InputField from "../addGlass/InputField";
import SelectField from "../addGlass/SelectField";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateGlass = () => {
  const { id } = useParams();
  const {
    data: glassData,
    isLoading,
    isError,
    refetch,
  } = useFetchGlassByIdQuery(id);
  const [updateGlass] = useUpdateGlassMutation();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (glassData) {
      setValue("title", glassData.title);
      setValue("description", glassData.description);
      setValue("category", glassData?.category);
      setValue("trending", glassData.trending);
      setValue("oldPrice", glassData.oldPrice);
      setValue("newPrice", glassData.newPrice);
      setValue("coverImage", glassData.coverImage);
      setValue("stockCount", glassData.stockCount); // 🆕 Added stock value
    }
  }, [glassData, setValue]);

  const onSubmit = async (data) => {
    const updateGlassData = {
      title: data.title,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: data.coverImage || glassData.coverImage,
      stock: Number(data.stockCount), // 🆕 Include stock in payload
    };

    try {
      await axios.put(
        `${getBaseURL()}/api/glasses/edit/${id}`,
        updateGlassData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        title: "Product Updated",
        text: "Your product is updated successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!",
      });
      await refetch();
    } catch (error) {
      console.log("Failed to update product.");
      alert("Failed to update product.");
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching product data</div>;

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Product</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter product title"
          register={register}
          validation={{
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
          }}
          error={errors.title}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter product description"
          type="textarea"
          register={register}
          validation={{
            required: "Description is required",
            minLength: {
              value: 5,
              message: "Description must be at least 5 characters",
            },
          }}
          error={errors.description}
        />

        <SelectField
          label="Category"
          name="category"
          options={[
            { value: "", label: "Choose A Category" },
            { value: "Professional", label: "Professional" },
            { value: "Casual", label: "Casual" },
            { value: "Sports & Adventure", label: "Sports & Adventure" },
            { value: "Luxury & Fashion", label: "Luxury & Fashion" },
          ]}
          register={register}
        />

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("trending")}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Trending
            </span>
          </label>
        </div>

        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
          validation={{
            required: "Old price is required",
            min: { value: 0, message: "Price must be a positive value" },
            max: {
              value: 1000000,
              message: "Old price must be less than 1,000,000",
            },
          }}
          error={errors.oldPrice}
        />

        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
          validation={{
            required: "New price is required",
            min: { value: 0, message: "Price must be a positive value" },
            max: {
              value: 1000000,
              message: "New price must be less than 1,000,000",
            },
          }}
          error={errors.newPrice}
        />

        <InputField
          label="Cover Image URL"
          name="coverImage"
          type="text"
          placeholder="Cover Image URL"
          register={register}
        />

        {/* 🆕 Stock input field */}
        <InputField
          label="Stock"
          name="stockCount"
          type="number"
          placeholder="Enter available stock quantity"
          register={register}
          validation={{
            required: "Stock is required",
            min: {
              value: 0,
              message: "Stock must be a non-negative number",
            },
            max: {
              value: 100000,
              message: "Stock must be realistic",
            },
          }}
          error={errors.stockCount}
        />

        <button
          type="submit"
          className="w-full py-2 bg-primary text-white font-bold rounded-md"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateGlass;
