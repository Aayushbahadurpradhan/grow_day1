import {
  useAddPostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  jsonPlaceholderApi
} from '../api/jsonPlaceholderApi'
import { useDispatch } from 'react-redux'

export default function Posts() {
  const dispatch = useDispatch()
  const { data: posts, error, isLoading, refetch } = useGetPostsQuery()
  const [addPost] = useAddPostMutation()
  const [deletePost] = useDeletePostMutation()

  const handleAddPost = async () => {
    const newPost = {
      title: 'New Post',
      body: 'Post body content here.',
    }

    await addPost(newPost)
    dispatch(
      jsonPlaceholderApi.util.updateQueryData('getPosts', undefined, (draft) => {
        draft.push(newPost)
      })
    )
  }

  const handleDeletePost = async (id) => {
    await deletePost(id)
    dispatch(
      jsonPlaceholderApi.util.updateQueryData('getPosts', undefined, (draft) =>
        draft.filter((post) => post.id !== id)
      )
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Posts</h2>
      <div className="space-x-2">
        <button onClick={refetch} className="bg-blue-500 text-white px-4 py-1 rounded">Manual Refetch</button>
        <button onClick={handleAddPost} className="bg-green-500 text-white px-4 py-1 rounded">Add Post</button>
      </div>

      {isLoading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error loading posts</p>}

      <ul className="space-y-2">
        {posts?.slice(0, 10).map((post) => (
          <li key={post.id} className="bg-gray-100 p-3 rounded shadow-sm flex justify-between">
            <div>
              <strong className="block">{post.title}</strong>
              <p className="text-sm text-gray-600">{post.body}</p>
            </div>
            <button onClick={() => handleDeletePost(post.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
