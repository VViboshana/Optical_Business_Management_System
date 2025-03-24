import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddGlassMutation } from "../../../redux/features/glasses/glassApi";
import InputField from "../addGlass/InputField";
import SelectField from "../addGlass/SelectField";
import Swal from "sweetalert2";
import axios from "axios";
import getBaseURL from "../../../utils/baseURL";

const AddGlass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [addGlass] = useAddGlassMutation();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState("");

  const onSubmit = async (data) => {
    if (!imageFile) {
      Swal.fire({
        title: "Error!",
        text: "Please select a cover image.",
        icon: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    try {
      const response = await axios.post(`${getBaseURL()}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const imageUrl = response.data.url;

      const newGlassData = {
        ...data,
        coverImage: imageUrl,
      };

      await addGlass(newGlassData).unwrap();
      Swal.fire({
        title: "Product Added",
        text: "Your product has been uploaded successfully!",
        icon: "success",
      });
      reset();
      setImageFileName("");
      setImageFile(null);
    } catch (error) {
      console.error(error);
      Swal.fire({ title: "Error", text: "Failed to add product.", icon: "error" });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
    }
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter product title"
          register={register}
          validation={{
            required: "Title is required",
            minLength: { value: 3, message: "Title must be at least 3 characters" },
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
            minLength: { value: 5, message: "Description must be at least 5 characters" },
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

        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
          validation={{ required: "Old price is required", min: 0 }}
          error={errors.oldPrice}
        />

        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
          validation={{ required: "New price is required", min: 0 }}
          error={errors.newPrice}
        />

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
          {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
        </div>

        <button type="submit" className="w-full py-2 bg-primary text-white font-bold rounded-md">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddGlass;