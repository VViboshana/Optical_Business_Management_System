import React, { useEffect } from "react";
import {
  useDeleteGlassMutation,
  useFetchAllGlassesQuery,
} from "../../../../Inventory/redux/features/glasses/glassApi";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../../../Products/components/Navbar";

const ManageGlasses = () => {
  const navigate = useNavigate();
  const { data: glasses, refetch } = useFetchAllGlassesQuery();
  const [deleteGlass] = useDeleteGlassMutation();

  // Handle deleting a glass
  const handleDeleteGlass = async (id) => {
    try {
      await deleteGlass(id).unwrap();
      alert("Glass deleted successfully!");
      refetch(); // Re-fetch the glasses data to reflect the changes
    } catch (error) {
      console.error("Failed to delete glass:", error.message);
      alert("Failed to delete glass. Please try again.");
    }
  };

  // Create a new sorted array without mutating the original array
  const sortedGlasses = [...(glasses || [])].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <>
    <NavBar/>
    <section className="py-1 bg-blueGray-50">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  Frames in Stock
                </h3>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs uppercase font-semibold text-left">
                    #
                  </th>
                  <th className="px-6 py-3 text-xs uppercase font-semibold text-left">
                    Glass Title
                  </th>
                  <th className="px-6 py-3 text-xs uppercase font-semibold text-left">
                    Category
                  </th>
                  <th className="px-6 py-3 text-xs uppercase font-semibold text-left">
                    Price
                  </th>
                  <th className="px-6 py-3 text-xs uppercase font-semibold text-left">
                    Stock Count
                  </th>
                  <th className="px-6 py-3 text-xs uppercase font-semibold text-left">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {sortedGlasses &&
                  sortedGlasses.map((glass, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{glass.title}</td>
                      <td className="px-6 py-4">{glass.category}</td>
                      <td className="px-6 py-4">${glass.newPrice}</td>
                      <td className="px-6 py-4">
                        {glass.stockCount !== undefined ? glass.stockCount : "N/A"}
                      </td>
                      <td className="px-6 py-4 space-x-4">
                        <Link
                          to={`/edit-glass/${glass._id}`}
                          className="text-indigo-600 hover:text-indigo-700"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteGlass(glass._id)}
                          className="bg-red-500 py-1 px-4 rounded-full text-white"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ManageGlasses;
