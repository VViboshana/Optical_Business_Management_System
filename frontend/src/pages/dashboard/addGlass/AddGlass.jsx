import React, { useState } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import {useForm} from 'react-hook-form'
import { useAddGlassMutation } from '../../../redux/features/glasses/glassApi'
import Swal from 'sweetalert2';

const AddGlass = () => {
  const {register, handleSubmit, formState:{errors},reset}=useForm();
  const [imageFile, setimageFile] = useState(null)
  const[addGlass,{isLoading, isError}]=useAddGlassMutation()
  const [imageFileName, setimageFileName] = useState('')
  const onSubmit = async(data)=>{
    const newGlassData={
      ...data,
      coverImage:imageFileName
    }
    try {
      await addGlass(newGlassData).unwrap();
      Swal.fire({
        title: "Product added",
        text: "Your product is uploaded successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!"
      });
      reset();
      setimageFileName('')
      setimageFile(null);
    } catch (error) {
      console.error(error);
      alert("Failed to add book. Please try again")
    }
  }

  const handleFileChange = (e)=>{
    const file = e.target.files[0];
    if(file){
      setimageFile(file);
      setimageFileName(file.name);

    }
  }
  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Product</h2>

    {/* Form starts here */}
    <form onSubmit={handleSubmit(onSubmit)} className=''>
      {/* Reusable Input Field for Title */}
      <InputField
        label="Title"
        name="title"
        placeholder="Enter product title"
        register={register}
      />

      {/* Reusable Textarea for Description */}
      <InputField
        label="Description"
        name="description"
        placeholder="Enter product description"
        type="textarea"
        register={register}

      />

      {/* Reusable Select Field for Category */}
      <SelectField
        label="Category"
        name="category"
        options={[
          { value: '', label: 'Choose A Category' },
          { value: 'Professional', label: 'Professional' },
          { value: 'Casual', label: 'Casual' },
          { value: 'Sports & Adventure', label: 'Sports & Adventure' },
          { value: 'Luxury & Fashion', label: 'Luxury & Fashion' },
          // Add more options as needed
        ]}
        register={register}
      />

      {/* Trending Checkbox */}
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            {...register('trending')}
            className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
        </label>
      </div>

      {/* Old Price */}
      <InputField
        label="Old Price"
        name="oldPrice"
        type="number"
        placeholder="Old Price"
        register={register}
       
      />

      {/* New Price */}
      <InputField
        label="New Price"
        name="newPrice"
        type="number"
        placeholder="New Price"
        register={register}
        
      />

      {/* Cover Image Upload */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
        {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full py-2 bg-primary text-white font-bold rounded-md">
       {
          isLoading ? <span className="">Adding.. </span> : <span>Add Product</span>
        }
      </button>
    </form>
  </div>
  )
}

export default AddGlass