import React, { useEffect } from 'react';
import { useGetTodosQuery } from '../api/apiSlice';
import useStore from '../slices/store';
const TodoStats = () => {
  const { data: todos, isSuccess } = useGetTodosQuery();
  const totalCompletedTodos = useStore((state) => state.totalCompletedTodos);
  const setTotalCompletedTodos = useStore((state) => state.setTotalCompletedTodos);
  useEffect(() => {
    if (isSuccess && todos) {
      const completed = todos.filter((todo) => todo.completed).length;
      setTotalCompletedTodos(completed);
    }
  }, [isSuccess, todos, setTotalCompletedTodos]);

  return (
    <div className="mt-4 p-3 border rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
      <h3 className="text-lg font-semibold">Todo Stats</h3>
      <p>Total Completed Todos: {totalCompletedTodos}</p>
    </div>
  );
};

export default TodoStats;
