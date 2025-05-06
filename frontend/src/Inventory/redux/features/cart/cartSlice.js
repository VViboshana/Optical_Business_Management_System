import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    // Action to add items to the cart
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (!existingItem) {
        state.cartItems.push({ ...action.payload, quantity: 1 });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Frame added to the cart",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "Are you sure?",
          text: "This item is already added to the cart!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Add it!",
        }).then((result) => {
          if (result.isConfirmed) {
            state.cartItems.push({ ...action.payload, quantity: 1 });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Frame added to the cart",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    },

    // Action to remove an item from the cart
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
    },

    // Action to clear the entire cart
    clearCart: (state) => {
      state.cartItems = [];
    },

    // Action to update the quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item._id === _id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
