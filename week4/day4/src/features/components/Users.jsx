import {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  jsonPlaceholderApi, // <-- import the API object for cache update
} from '../api/jsonPlaceholderApi'
import { useDispatch } from 'react-redux'

export default function Users() {
  const dispatch = useDispatch()

  const { data: users, error, isLoading, refetch } = useGetUsersQuery()
  const [addUser] = useAddUserMutation()
  const [deleteUser] = useDeleteUserMutation()

  const handleAdd = async () => {
    const newUser = {
      id: Date.now(), // generate fake ID
      name: 'New User',
      email: 'new@example.com',
    }

    await addUser(newUser)

    // 🧠 Manually update cache
    dispatch(
      jsonPlaceholderApi.util.updateQueryData('getUsers', undefined, (draft) => {
        draft.push(newUser)
      })
    )
  }

  const handleDelete = async (id) => {
    await deleteUser(id)

    // 🧠 Manually remove from cache
    dispatch(
      jsonPlaceholderApi.util.updateQueryData('getUsers', undefined, (draft) =>
        draft.filter((user) => user.id !== id)
      )
    )
  }

  return (
    <div>
      <h2>Users</h2>
      <button onClick={refetch}>Manual Refetch</button>
      <button onClick={handleAdd}>Add User</button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching users</p>}

      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email}){' '}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
