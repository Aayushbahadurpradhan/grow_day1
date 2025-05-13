import {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  jsonPlaceholderApi,
} from '../api/jsonPlaceholderApi'
import { useDispatch } from 'react-redux'

export default function Users() {
  const dispatch = useDispatch()

  const { data: users, error, isLoading, refetch } = useGetUsersQuery()
  const [addUser] = useAddUserMutation()
  const [deleteUser] = useDeleteUserMutation()

  const handleAdd = async () => {
    const newUser = {
      id: Math.random(),
      name: 'New User',
      email: `new${Math.random().toString(36).substring(2, 8)}@example.com`,
    }

    await addUser(newUser)
    dispatch(
      jsonPlaceholderApi.util.updateQueryData('getUsers', undefined, (draft) => {
        draft.push(newUser)
      })
    )
  }

  const handleDelete = async (id) => {
    await deleteUser(id)
    dispatch(
      jsonPlaceholderApi.util.updateQueryData('getUsers', undefined, (draft) =>
        draft.filter((user) => user.id !== id)
      )
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Users</h2>
      <div className="space-x-2">
        <button onClick={refetch} className="bg-blue-500 text-white px-4 py-1 rounded">Manual Refetch</button>
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-1 rounded">Add User</button>
      </div>

      {isLoading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error fetching users</p>}

      <ul className="space-y-2">
        {users?.map((user) => (
          <li key={user.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <span>{user.name} ({user.email})</span>
            <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-2 py-0.5 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
