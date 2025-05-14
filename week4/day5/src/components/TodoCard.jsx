import useTodoStore from '../slices/store'; 
import { useState } from 'react';

export default function TodoCard({ todo }) {
  const { removeTodo, editTodo } = useTodoStore();
  const [showFull, setShowFull] = useState(false);

  const handleEdit = () => {
    const title = prompt('Edit title', todo.title);
    const desc = prompt('Edit description', todo.description);
    if (title !== null && desc !== null) {
      editTodo(todo.id, title.trim(), desc.trim());
    }
  };

  return (
    <div
      className="bg-white p-3 rounded shadow item text-black"
      draggable
      data-id={todo.id}
    >
      <h3 className="font-bold">{todo.title}</h3>
      <p
        className={`text-sm ${todo.status === 'completed' ? 'line-through text-gray-500' : ''}`}
      >
        {showFull ? todo.description : todo.description.slice(0, 100)}
        {todo.description.length > 100 && (
          <button onClick={() => setShowFull(!showFull)} className="text-blue-500 ml-2">
            {showFull ? 'See Less' : 'See More'}
          </button>
        )}
      </p>
      <div className="flex justify-between mt-2">
        <button onClick={handleEdit} className="text-yellow-600">
          Edit
        </button>
        <button onClick={() => removeTodo(todo.id)} className="text-red-600">
          Delete
        </button>
      </div>
    </div>
  );
}
