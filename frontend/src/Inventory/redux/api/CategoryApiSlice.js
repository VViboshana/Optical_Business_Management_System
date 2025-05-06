import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        createCategory:builder.mutation({
            query: (newCategory) =>({
                url: `${CATEGORY_URL}/create`,
                method: "POST",
                body: newCategory,
            })
        }),

        updateCategory: builder.mutation({
            query: ({updatedCategory,categoryId}) =>({
                url: `${CATEGORY_URL}/update/${categoryId}`,
                method:"PUT",
                body: updatedCategory,

            })
        }),

        deleteCategory: builder.mutation({
            query: (categoryId) =>({
                url: `${CATEGORY_URL}/delete/${categoryId}`,
                method:"DELETE",
            })
        }),

        fetchCategories: builder.query({
            query: () => `${CATEGORY_URL}/read`,

        }),
    }),
});

export const {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoriesQuery,
    
} = categoryApiSlice