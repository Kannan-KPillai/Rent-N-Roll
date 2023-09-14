import { apiSlice } from "./ApiSlice";

const ADMIN_URL = '/api/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/login`,
                method:'POST',
                body: data
            }),
        }), 
        logout: builder.mutation({
            query: () => ({
                url: `${ADMIN_URL}/logout`,
                method:'POST'
            }),
        }),
        category: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/category`,
                method:'POST',
                body: data,
            }),
        }),      
    })
})

export const { useLoginMutation, useLogoutMutation,  useCategoryMutation } = adminApiSlice