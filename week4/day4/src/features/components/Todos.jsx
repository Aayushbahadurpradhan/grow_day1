import { useDispatch } from 'react-redux'
import {
  jsonPlaceholderApi,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
} from '../api/jsonPlaceholderApi'

export default function Todos() {
  const dispatch = useDispatch()
  const { data: todos, error, isLoading, refetch } = useGetTodosQuery()
  const [addTodo] = useAddTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()

  const handleAddTodo = async () => {
    const newTodo = {
      title: 'New Todo',
      completed: false,
    }

    await addTodo(newTodo)
    dispatch(
      jsonPlaceholderApi.util.updateQueryData('getTodos', undefined, (draft) => {
        draft.push(newTodo)
      })
    )
  }

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id)
    dispatch(
      jsonPlaceholderApi.util.updateQueryData('getTodos', undefined, (draft) =>
        draft.filter((todo) => todo.id !== id)
      )
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Todos</h2>
      <div className="space-x-2">
        <button onClick={refetch} className="bg-blue-500 text-white px-4 py-1 rounded">Manual Refetch</button>
        <button onClick={handleAddTodo} className="bg-green-500 text-white px-4 py-1 rounded">Add Todo</button>
      </div>

      {isLoading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error loading todos</p>}

      <ul className="space-y-2">
        {todos?.slice(0, 10).map((todo) => (
          <li key={todo.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <div>
              <input type="checkbox" checked={todo.completed} readOnly className="mr-2" />
              {todo.title}
            </div>
            <button onClick={() => handleDeleteTodo(todo.id)} className="bg-red-500 text-white px-2 py-0.5 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
