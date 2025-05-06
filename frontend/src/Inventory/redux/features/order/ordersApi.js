import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../../utils/baseURL";

const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials: 'include'
    }),

    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/",
                method: "POST",
                body: newOrder,
                credentials: 'include',
            }),
            invalidatesTags: ['Orders']
        }),
        getOrderByEmail: builder.query({
            query: (email) => ({
                url: `?email=${email}`
            }),
            providesTags: ['Orders']
        }),
        getOneOrderById: builder.query({
            query: (id) => ({
                url: `/${id}`
            }),
            providesTags: ['Orders']
        }),
        updateOrderStatus: builder.mutation({
            query: (id) => ({
                url: `/${id}/status`,
                method: 'PATCH'
            }),
            invalidatesTags: ['Orders']
        })
    }),
})

export const {
    useCreateOrderMutation,
    useGetOrderByEmailQuery,
    useGetOneOrderByIdQuery,
    useUpdateOrderStatusMutation
} = ordersApi;

export default ordersApi;