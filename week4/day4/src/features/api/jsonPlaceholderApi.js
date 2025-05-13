import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const jsonPlaceholderApi = createApi({
  reducerPath: 'jsonPlaceholderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['Users', 'Posts', 'Todos', 'ErrorLogs'],
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

    // Posts
    getPosts: builder.query({
      query: () => 'posts',
      providesTags: ['Posts'],
    }),
    addPost: builder.mutation({
      query: (post) => ({
        url: 'posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Posts'],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),

    // Todos
    getTodos: builder.query({
      query: () => 'todos',
      providesTags: ['Todos'],
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: 'todos',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: ['Todos'],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todos'],
    }),

    // Error Logs (Polling Demo)
    getErrorLogs: builder.query({
      query: () => 'comments',
      providesTags: ['ErrorLogs'],
      pollingInterval: 5000,
    }),
  }),
})

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useGetPostsQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetErrorLogsQuery,
} = jsonPlaceholderApi
