import {PRODUCT_URL, UPLOAD_URL} from "../constants"
import {apiSlice} from "./apiSlice.js"

export const productApiSlice= apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getProducts: builder.query({
            query: ({keyword}) => ({
                url: `${PRODUCT_URL}/search`,
                params: {keyword},
            }),

            keepUnusedDataFor: 5,
            providesTags: ["Product"]
        }),

        getProductById: builder.query({
            query: (productId) => `${PRODUCT_URL}/get/${productId}`,
            providesTags: (result, error, productId) => [
                {type: "Product", id: productId}
            ]
        }),

        allProducts: builder.query({
            query: () => `${PRODUCT_URL}/read`
        }),

        searchProducts: builder.query({
            query: ({ keyword = "", brand = "", category = "" }) => ({
                url: `${PRODUCT_URL}/search`,
                params: { keyword, brand, category }
            }),
            providesTags: ["Product"]
        }),

        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/get/${productId}`
            }),
            keepUnusedDataFor:5,
        }),

        createProduct: builder.mutation({
            query: (productData) => ({
                url: `${PRODUCT_URL}/create`,
                method:"POST",
                body: productData,
                formData: true,
            }),

            invalidatesTags: ["Product"]
        }),

        updateProduct: builder.mutation({
            query: ({ productId, formData }) => ({
              url: `${PRODUCT_URL}/update/${productId}`,
              method: "PUT",
              body: formData,
            }),
            invalidatesTags: ["Product"] // <== Add this
        }),
        

        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCT_URL}/delete/${productId}`,
                method:"DELETE"
            }),

            providesTags: ["Product"]
        }),

        uploadProductImage: builder.mutation({
            query: (data) => ({
              url: `${UPLOAD_URL}`,
              method: "POST",
              body: data,
            }),
          }),

    })
})

export const{
    useGetProductByIdQuery,
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useAllProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useUploadProductImageMutation,
    useSearchProductsQuery    // New hook for search and filter
} = productApiSlice
