import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseURL from '../../../utils/baseURL'

const baseQuery = fetchBaseQuery({
    baseUrl:`${getBaseURL()}/api/glasses`,
    credentials:'include',
    prepareHeaders:(Headers)=>{
        const token = localStorage.getItem('token');
        if(token){
            Headers.set('Authorization',`Bearer ${token}`);
        }
        return Headers;
    }
})

const glassesApi = createApi({
    reducerPath:'glassesApi',
    baseQuery,
    tagTypes:['Glasses'],
    endpoints:(builder)=>({
        fetchAllGlasses:builder.query({
            query:()=>"/",
            providesTags:["Glasses"]
        }),
        fetchGlassById:builder.query({
            query:(id)=>`/${id}`,
            providesTags:(results,error,id)=>[{type:"Glasses",id}]
        }),
        addGlass:builder.mutation({
            query:(newGlass)=>({
                url:`/create-glass`,
                method:"POST",
                body:newGlass
            }),
            invalidatesTags:["Glasses"]
        }),
        updateGlass:builder.mutation({
            query:({id,...rest})=>({
                url:`/api/glasses/edit/${id}`,
                method:"PUT",
                body:rest,
                headers:{
                    'Content-Type':'application/json'
                }
            }),
            invalidatesTags:["Glasses"]
        }),
        deleteGlass:builder.mutation({
            query:(id)=>({
                url:`/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["Glasses"]
        })
    })
})

export const {useFetchAllGlassesQuery, useFetchGlassByIdQuery,useAddGlassMutation,useUpdateGlassMutation,useDeleteGlassMutation}= glassesApi;
export default glassesApi;