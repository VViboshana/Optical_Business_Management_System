import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useUploadProductImageMutation,useCreateProductMutation} from "../redux/api/ProductApiSlice.js"
import {useFetchCategoriesQuery} from "../redux/api/CategoryApiSlice.js"
import { toast } from "react-toastify";
import Navigation from "./Navigation.jsx";
const ProductList = () => {

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation()
  const [createProduct] = useCreateProductMutation()
  const { data: categories } = useFetchCategoriesQuery()

  const uploadFileHandler = async (e) => {
      if (!e.target.files[0]) {
          toast.error("Please select an image file");
          return;
      }

      const file = e.target.files[0];
      console.log('Selected file:', {
          name: file.name,
          type: file.type,
          size: file.size
      });
      
      // Validate file type
      if (!file.type.match(/image\/(jpeg|png|webp)/)) {
          console.error('Invalid file type:', file.type);
          toast.error("Please upload a valid image file (JPEG, PNG, or WEBP)");
          return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
          console.error('File too large:', file.size);
          toast.error("File size too large. Maximum size is 5MB");
          return;
      }

      const formData = new FormData();
      formData.append('image', file);

      try {
          console.log('Sending upload request...');
          console.log('FormData contents:', {
              hasImage: formData.has('image'),
              file: formData.get('image')
          });
          
          const res = await uploadProductImage(formData).unwrap();
          console.log('Upload response:', res);
          
          if (res.image) {
              toast.success(res.message || "Image uploaded successfully");
              setImage(res.image);
              setImageUrl(res.image);
          } else {
              console.error('No image URL in response:', res);
              toast.error("Failed to get image URL from response");
          }
      } catch (error) {
          console.error('Upload error details:', {
              error: error,
              data: error?.data,
              status: error?.status,
              message: error?.data?.error || error?.data?.message,
              details: error?.data?.details,
              originalError: error?.data?.originalError
          });
          
          // Display the most specific error message available
          const errorMessage = error?.data?.error || error?.data?.message || error?.data?.details || "Failed to upload image. Please try again.";
          toast.error(errorMessage);
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Form validation - check required fields
    if (!name || !description || !price || !category || !quantity || !brand) {
      toast.error("Please fill all required fields")
      return
    }

    // Validate image specifically since it's causing issues
    if (!image) {
      toast.error("Please upload a product image")
      return
    }

    try {
      const productData = new FormData()

      // Make sure image path is correctly added - remove leading slash if present
      const imagePath = image.startsWith('/') ? image.substring(1) : image
      productData.append('image', imagePath)
      productData.append('name', name)
      productData.append('description', description)
      productData.append('price', price)
      productData.append('category', category)
      productData.append('quantity', quantity)
      productData.append('brand', brand)
      productData.append('countInStock', stock)

      // Use unwrap to properly handle the response
      const result = await createProduct(productData).unwrap()

      // Check if the response contains an error field (from the backend)
      if (result.error) {
        toast.error(result.error || "Product create failed. Try again.")
      } else {
        toast.success(`${result.name} is created`)
        navigate("/allProductList") // Navigate to product list after successful creation
      }
    } catch (error) {
      console.error("Product creation error:", error)
      // Display the specific error message from the backend if available
      toast.error(error?.data?.error || error?.data?.message || "Product create failed. Try again.")
    }
  }
      


  return (
    <>
    <Navigation/>
      <div className="container mx-auto my-10">
<div className="flex justify-center">
  <div className="w-full max-w-2xl p-8 border border-gray-300 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Create Product</h2>

    {imageUrl && (
      <div className="text-center mb-6">
        <img
          src={imageUrl}
          alt="Product"
          className="block mx-auto max-h-[200px] rounded-lg"
        />
      </div>
    )}

<div className="mb-6">
<label
  className="block w-full text-center bg-orange-500 text-white font-bold py-3 px-6 rounded-lg cursor-pointer hover:bg-orange-600 transition"
>
  Upload Image
  <input
    type="file"
    name="image"
    accept="image/*"
    onChange={uploadFileHandler}
    className="hidden"
  />
</label>
</div>



    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="name" className="text-gray-700 font-medium block mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="price" className="text-gray-700 font-medium block mb-2">
          Price
        </label>
        <input
          type="number"
          id="price"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div>
        <label htmlFor="quantity" className="text-gray-700 font-medium block mb-2">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="brand" className="text-gray-700 font-medium block mb-2">
          Brand
        </label>
        <input
          type="text"
          id="brand"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>
    </div>

    <div className="mt-6">
      <label htmlFor="description" className="text-gray-700 font-medium block mb-2">
        Description
      </label>
      <textarea
        id="description"
        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="4"
      ></textarea>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div>
        <label htmlFor="stock" className="text-gray-700 font-medium block mb-2">
          Count In Stock
        </label>
        <input
          type="text"
          id="stock"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>

      <div>
<label htmlFor="category" className="text-gray-700 font-medium block mb-2">
  Category
</label>
<select
  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
  onChange={(e) => setCategory(e.target.value)}
  value={category} // Ensure the selected category is reflected
>
  <option value="" disabled>Select a category</option> {/* Placeholder option */}
  
  {categories?.map((c) => (
    <option key={c._id} value={c._id}>
      {c.name}
    </option>
  ))}
</select>
</div>


    </div>

    <button
      onClick={handleSubmit}
      className="w-full py-4 mt-8 bg-orange-500 text-white text-lg font-bold rounded-lg hover:bg-orange-600 transition"
    >
      Submit
    </button>
  </div>
</div>
</div>

    </>
    );
}

export default ProductList