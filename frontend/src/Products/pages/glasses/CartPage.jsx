import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getImgUrl } from "../../../utils/getImgUrl";
import { clearCart, removeFromCart, updateQuantity } from "../../../Inventory/redux/features/cart/cartSlice";
import NavBar from "../../../Products/components/Navbar";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  
  // Handle total price calculation
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice * (item.quantity || 1), 0)
    .toFixed(2);

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleQuantityChange = (product, type) => {
    const updatedQuantity =
      type === "increase" ? (product.quantity || 1) + 1 : (product.quantity || 1) - 1;
    if (updatedQuantity > 0) {
      dispatch(updateQuantity({ _id: product._id, quantity: updatedQuantity }));
    }
  };

  return (
    <>
    <NavBar/>
    <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <div className="text-lg font-medium text-gray-900">Shopping cart</div>
          <div className="ml-3 flex h-7 items-center">
            <button
              type="button"
              onClick={handleClearCart}
              className="relative -m-2 py-1 px-2 border-2 border-primary text-black rounded-md hover:bg-primary hover:text-white transition-all duration-200"
            >
              <span>Clear Cart</span>
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            {cartItems.length > 0 ? (
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.map((product) => (
                  <li key={product?._id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt=""
                        src={`${getImgUrl(product?.coverImage)}`}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link to="/">{product?.title}</Link>
                          </h3>
                          <p className="sm:ml-4">${(product?.newPrice * (product.quantity || 1)).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 capitalize">
                          <strong>Category: </strong>
                          {product?.category}
                        </p>
                      </div>
                      <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleQuantityChange(product, "decrease")}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            -
                          </button>
                          <p className="mx-2 text-gray-500">
                            <strong>Qty:</strong> {product?.quantity || 1}
                          </p>
                          <button
                            onClick={() => handleQuantityChange(product, "increase")}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex">
                          <button
                            onClick={() => handleRemoveFromCart(product)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No product found!</p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${totalPrice}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        <div className="mt-6">
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <Link to="/">
            or
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default CartPage;
