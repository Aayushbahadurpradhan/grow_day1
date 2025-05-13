import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const jsonPlaceholderApi = createApi({
  reducerPath: 'jsonPlaceholderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['Users'],
  refetchOnReconnect: true,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    // Users
    getUsers: builder.query({
      query: () => 'users',
      providesTags: ['Users'],
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),

  }),
})

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  
} = jsonPlaceholderApi
