import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const GlassCard = ({ glass }) => {
  // Add to cart function
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <Link to={`/glasses/${glass._id}`}>
        <img
          src={getImgUrl(glass?.coverImage)}
          alt={glass.title || "Glass Image"}
          className="w-full h-40 object-cover rounded-md mb-2 cursor-pointer hover:scale-105 transition-all duration-200"
        />
      </Link>

      {/* Title */}
      <Link to={`/glasses/${glass._id}`}>
        <h3 className="text-sm font-semibold hover:text-blue-600 mb-1">
          {glass.title}
        </h3>
      </Link>

      {/* Price */}
      <p className="font-medium text-sm mb-2">
        ${glass?.newPrice}{" "}
        <span className="line-through text-gray-500 text-xs ml-1">
          ${glass?.oldPrice}
        </span>
      </p>

      {/* Description */}
      <p className="text-xs text-gray-700 mb-2">{glass.description}</p>

      {/* Add to Cart Button */}
      <button
        onClick={() => handleAddToCart(glass)}
        className="w-full flex items-center justify-center gap-1 bg-primary text-white py-1 rounded-md text-sm hover:bg-blue-700 transition duration-200"
      >
        <FiShoppingCart />
        <span>Add</span>
      </button>
    </div>
  );
};

export default GlassCard;
