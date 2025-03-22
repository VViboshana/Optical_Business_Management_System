import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import glassesApi from "./features/glasses/glassApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [glassesApi.reducerPath]: glassesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(glassesApi.middleware),
});
