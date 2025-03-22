import React from "react";
import { useParams } from "react-router-dom";
import { useFetchGlassByIdQuery } from "../../redux/features/glasses/glassApi";
import { getImgUrl } from "../../utils/getImgUrl";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const SingleGlass = () => {
  const { id } = useParams();
  const { data: glass, isLoading, isError } = useFetchGlassByIdQuery(id);

  //add to cart Function
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  //Loading and error messages
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error Happening to load glass information</div>;
  return (
    <div className="max-w-lg shadow-md p-5">
      <h1 className="text-2xl font-bold mb-6">{glass.title}</h1>

      <div className="">
        <div>
          <img
            src={`${getImgUrl(glass.coverImage)}`}
            alt={glass.title}
            className="mb-8"
          />
        </div>

        <div className="mb-5">
          <p className="text-gray-700 mb-2">
            <strong>Price: $</strong> {glass.newPrice || "admin"}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Available from:</strong>{" "}
            {new Date(glass?.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700 mb-4 capitalize">
            <strong>Category:</strong> {glass?.category}
          </p>
          <p className="text-gray-700">
            <strong>Description:</strong> {glass.description}
          </p>
        </div>

        <button
          onClick={() => handleAddToCart(glass)}
          className="btn-primary px-6 space-x-1 flex items-center gap-1 "
        >
          <FiShoppingCart className="" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default SingleGlass;
