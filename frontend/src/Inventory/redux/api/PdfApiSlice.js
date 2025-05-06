import { apiSlice } from "./apiSlice";
import { BASE_URL } from "../constants";

export const pdfApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        generateInventoryPDF: builder.mutation({
            query: () => ({
                url: `${BASE_URL}/api/pdf/inventory`,
                method: 'GET',
                responseType: 'blob',
                validateStatus: (response) => {
                    // Accept both successful responses and error responses
                    return response.status >= 200 && response.status < 500;
                },
            }),
            transformResponse: (response, meta) => {
                // Check if the response is a blob (PDF) or an error
                if (meta.response.headers.get('content-type')?.includes('application/pdf')) {
                    return response;
                }
                // If not a PDF, it's probably an error response
                return response.text().then(text => {
                    try {
                        return JSON.parse(text);
                    } catch (e) {
                        return { error: 'Invalid response format' };
                    }
                });
            },
        }),
    }),
});

export const { useGenerateInventoryPDFMutation } = pdfApiSlice; 