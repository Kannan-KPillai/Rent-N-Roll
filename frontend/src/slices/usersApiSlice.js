import { apiSlice } from "./apiSlices";

const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method:'POST',
                body: data
            }),
        }), 
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method:'POST',
                body: data
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method:'POST'
            }),
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method:'PUT',
                body: data
            }),
        }),
        OtpUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/verify-otp`,
                method:'POST',
                body: data
            }),
        }),
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation, useOtpUserMutation } = usersApiSlice;