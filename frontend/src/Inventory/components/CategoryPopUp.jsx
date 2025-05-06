const CategoryPopUp = ({ isOpen, onClose, onSubmit, value, setValue }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute bg-white p-6 rounded-lg z-10 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Category</h2>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={onClose}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={onSubmit}>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                placeholder="Category name"
              />
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryPopUp;
  