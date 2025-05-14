
import { useState } from 'react';
import useTodoStore from '../slices/store';

export default function TodoInput() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const addTodo = useTodoStore((s) => s.addTodo);

  const handleAdd = () => {
    if (!title || !description) {
      alert('Please fill both fields');
      return;
    }
    addTodo(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="mb-4 space-y-2">
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full text-black"
      />
      <textarea
        placeholder="Description"
        value={description}
        maxLength={400}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full text-black"
      />
      <p className="text-right text-sm text-gray-500">{description.length} / 400</p>
      <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Todo
      </button>
    </div>
  );
}
