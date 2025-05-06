import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import cartReducer from "./features/cart/cartSlice";
import glassesApi from "./features/glasses/glassApi";
import paymentApi from "./features/payment/paymentApi";
import ordersApi from "./features/order/ordersApi";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartReducer,
        [glassesApi.reducerPath]: glassesApi.reducer,
        [paymentApi.reducerPath]: paymentApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
    },  

    middleware: 
        (getDefaultMiddleware) =>getDefaultMiddleware().concat(apiSlice.middleware).concat(glassesApi.middleware).concat(paymentApi.middleware).concat(ordersApi.middleware),
        devTools:true,
     
})

setupListeners(store.dispatch)
export default store