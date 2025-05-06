import { apiSlice } from "./apiSlice";
import { EMAIL_URL } from "../constants";

export const emailApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        sendLowStockAlerts: builder.mutation({
            query: (data) => ({
                url: `${EMAIL_URL}/low-stock-alert`,
                method: "POST",
                body: data,
            }),
        }),
        testEmail: builder.mutation({
            query: (data) => ({
                url: `${EMAIL_URL}/test`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useSendLowStockAlertsMutation,
    useTestEmailMutation,
} = emailApiSlice;
