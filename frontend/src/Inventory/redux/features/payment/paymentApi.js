import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../../utils/baseURL";

const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/payments`,
    credentials: 'include',
  }),
  
  tagTypes: ['Payments'],

  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (newPayment) => ({
        url: "/add",
        method: "POST",
        body: newPayment,
        credentials: 'include',
      }),
      invalidatesTags: ['Payments'],
    }),
    
    getPaymentById: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags: ['Payments'],
    }),
    
   }),
});

export const { useCreatePaymentMutation, useGetPaymentByIdQuery } = paymentApi;

export default paymentApi;
