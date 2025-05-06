// CategoryForm.jsx
const CategoryForm = ({
    value,
    setValue,
    handleSubmit,
    buttonText = "Submit",
    handleDelete,
  }) => {
    return (
        <div className="p-3">
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    className="py-3 px-4 border rounded-lg w-full"
                    placeholder="Write category name"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
  
                <div className="flex justify-between">
                    {/* Explicitly set type="submit" */}
                    <button
                        type="submit"
                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                    >
                        {buttonText}
                    </button>
  
                    {handleDelete && (
                        // Explicitly set type="button" to prevent form submission
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault(); // Prevent any default behavior
                                handleDelete();
                            }}
                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
  };
  
  export default CategoryForm;
  