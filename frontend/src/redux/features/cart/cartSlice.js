import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  cartItems: [
    {
      _id: "1",
      title: "Frame1",
      newPrice: 1500,
      quantity: 1,
    },
    {
      _id: "2",
      title: "Frame5",
      newPrice: 800,
      quantity: 2,
    },
    {
      _id: "3",
      title: "Frame3",
      newPrice: 1700,
      quantity: 1,
    }
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (!existingItem) {
        state.cartItems.push(action.payload);
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
          text: "This item already added to the cart!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Add it!",
        }).then((result) => {
          if (result.isConfirmed) {
            state.cartItems.push(action.payload);
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
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

//export actions

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
