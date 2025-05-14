import { useEffect, useRef } from 'react';
import useTodoStore from '../slices/store';
import TodoCard from './TodoCard';

export default function TodoList() {
  const { todos, reorder } = useTodoStore();
  const refs = {
    todo: useRef(),
    incomplete: useRef(),
    completed: useRef(),
  };

  const filterByStatus = (status) => todos.filter((t) => t.status === status);

  const handleDrop = (e, status) => {
  e.preventDefault();
  const id = Number(e.dataTransfer.getData('text/plain'));
  const container = refs[status].current;

  const currentTodo = todos.find((t) => t.id === id);
  if (!currentTodo) return;

  const updatedTodos = todos.map((t) =>
    t.id === id ? { ...t, status } : t
  );

  const children = Array.from(container.children).filter((child) =>
    child.classList.contains('item')
  );

  const afterElement = children.find((child) => {
    const box = child.getBoundingClientRect();
    return e.clientY < box.top + box.height / 2;
  });

  const reorderedInStatus = updatedTodos
    .filter((t) => t.status === status && t.id !== id);

  const insertAt = afterElement
    ? reorderedInStatus.findIndex((t) => t.id === Number(afterElement.dataset.id))
    : reorderedInStatus.length;

  reorderedInStatus.splice(insertAt, 0, { ...currentTodo, status });

  const newTodos = [
    ...updatedTodos.filter((t) => t.status !== status),
    ...reorderedInStatus,
  ];

  reorder(newTodos);
};


  useEffect(() => {
    ['todo', 'incomplete', 'completed'].forEach((status) => {
      const container = refs[status].current;
      container.addEventListener('dragover', (e) => e.preventDefault());
      container.addEventListener('drop', (e) => handleDrop(e, status));
    });

    document.querySelectorAll('.item').forEach((el) => {
      el.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', el.dataset.id);
        el.classList.add('dragging');
      });
      el.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
      });
    });
  }, [todos]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {['todo', 'incomplete', 'completed'].map((status) => (
        <div key={status}>
          <h2 className="font-bold mb-2 capitalize">{status}</h2>
          <div
            ref={refs[status]}
            className="min-h-[120px] p-2 border rounded space-y-2 bg-gray-50"
          >
            {filterByStatus(status).length === 0 ? (
              <p className="text-gray-400 italic text-center">Drop tasks here</p>
            ) : (
              filterByStatus(status).map((todo) => (
                <TodoCard key={todo.id} todo={todo} />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
