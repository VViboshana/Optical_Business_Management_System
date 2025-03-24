import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseUrl";

const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials: 'include'
    }),

    tagTypes: ['Orders'],
    endpoints: (builder) =>({
        createOrder: (builder.mutation) ({
            query: (newOrder) => ({
                url: "/",
                method: "POST",
                body: newOrder,
                credentials:'include',
            })
        }),
        getOrderByEmail: (builder.query)({
            query:(email) => ({
                url:`?email=${email}`
            }),
            providesTags: ['orders']
        }),
        getOneOrderById: (builder.query)({
            query:(id) => ({
                url:`/${id}`
            }),
        }),

    }),
})

export const { useCreateOrderMutation, useGetOrderByEmailQuery, useGetOneOrderByIdQuery } = ordersApi;
 

export default ordersApi;