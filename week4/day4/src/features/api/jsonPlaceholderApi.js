import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const jsonPlaceholderApi = createApi({
  reducerPath: 'jsonPlaceholderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  tagTypes: ['Users', 'Posts', 'Todos'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['Users'],
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),

    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Posts'],
    }),
    addPost: builder.mutation({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
    }),
    getTodos: builder.query({
      query: () => '/todos',
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Todos', id })),
            { type: 'Todos', id: 'LIST' },
          ]
          : [{ type: 'Todos', id: 'LIST' }],
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: '/todos',
        method: 'POST',
        body: newTodo,
      }),
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Todos', id }],
    }),
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
