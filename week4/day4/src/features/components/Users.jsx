import {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  jsonPlaceholderApi, // Import the api slice
} from '../api/jsonPlaceholderApi'
import { useDispatch } from 'react-redux'

export default function Users() {
  const dispatch = useDispatch()

  const { data: users, error, isLoading, refetch } = useGetUsersQuery()
  const [addUser] = useAddUserMutation()
  const [deleteUser] = useDeleteUserMutation()

  const handleAdd = async () => {
    const newUser = {
      id: Date.now(), 
      name: 'New User',
      email: 'new@example.com',
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
