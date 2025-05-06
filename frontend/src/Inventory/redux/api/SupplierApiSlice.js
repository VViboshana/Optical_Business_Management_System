import { apiSlice } from "./apiSlice";
import { SUPPLIER_URL } from "../constants";

export const supplierApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllSuppliers: builder.query({
            query: () => SUPPLIER_URL,
            providesTags: ["Supplier"],
        }),
        getSupplierById: builder.query({
            query: (supplierId) => `${SUPPLIER_URL}/${supplierId}`,
            providesTags: (result, error, supplierId) => [
                { type: "Supplier", id: supplierId }
            ],
        }),
        createSupplier: builder.mutation({
            query: (data) => ({
                url: SUPPLIER_URL,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Supplier"],
        }),
        updateSupplier: builder.mutation({
            query: ({ supplierId, ...data }) => ({
                url: `${SUPPLIER_URL}/${supplierId}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Supplier"],
        }),
        deleteSupplier: builder.mutation({
            query: (supplierId) => ({
                url: `${SUPPLIER_URL}/${supplierId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Supplier"],
        }),
    }),
});

export const {
    useGetAllSuppliersQuery,
    useGetSupplierByIdQuery,
    useCreateSupplierMutation,
    useUpdateSupplierMutation,
    useDeleteSupplierMutation,
} = supplierApiSlice;
