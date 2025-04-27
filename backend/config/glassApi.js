import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const glassApi = createApi({
  reducerPath: "glassApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    fetchAllGlasses: builder.query({
      query: () => "/glasses",
    }),
    fetchGlassById: builder.query({
      query: (id) => `/glasses/${id}`,
    }),
  }),
});

export const { useFetchAllGlassesQuery, useFetchGlassByIdQuery } = glassApi;
