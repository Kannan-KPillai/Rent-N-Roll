import { apiSlice } from "./apiSlice";

const OWNER_URL = '/api/owner';

export const ownerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${OWNER_URL}/login`,
                method:'POST',
                body: data
            }),
        }), 
        register: builder.mutation({
            query: (data) => ({
                url: `${OWNER_URL}/register`,
                method:'POST',
                body: data
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${OWNER_URL}/logout`,
                method:'POST'
            }),
        }),
        updateOwner: builder.mutation({
            query: (data) => ({
                url: `${OWNER_URL}/profile`,
                method:'PUT',
                body: data
            }),
        }),
        
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateOwnerMutation } = ownerApiSlice;