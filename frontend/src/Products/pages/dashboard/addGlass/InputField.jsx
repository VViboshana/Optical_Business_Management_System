import React from "react";

const InputField = ({
  label,
  name,
  type = "text",
  register,
  placeholder,
  validation,
  error,  // To display validation error
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        type={type}
        {...register(name, validation)}
        className={`p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300 ${error ? "border-red-500" : ""}`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>} {/* Error message */}
    </div>
  );
};

export default InputField;
