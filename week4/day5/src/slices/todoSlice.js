const todoSlice = (set, get) => ({
  todos: JSON.parse(localStorage.getItem('todos')) || [],
  addTodo: (title, description) => {
    const newTodo = {
      todoid: Date.now(),
      title,
      description,
      status: 'todo',
    };
    const updated = [...get().todos, newTodo];
    set({ todos: updated });
    localStorage.setItem('todos', JSON.stringify(updated));
  },
  removeTodo: (todoid) => {
    const updated = get().todos.filter((t) => t.todoid !== todoid);
    set({ todos: updated });
    localStorage.setItem('todos', JSON.stringify(updated));
  },
  editTodo: (todoid, newTitle, newDescription) => {
    const updated = get().todos.map((t) =>
      t.todoid === todoid ? { ...t, title: newTitle, description: newDescription } : t
    );
    set({ todos: updated });
    localStorage.setItem('todos', JSON.stringify(updated));
  },
  updateStatus: (todoid, status) => {
    const updated = get().todos.map((t) =>
      t.todoid === todoid ? { ...t, status } : t
    );
    set({ todos: updated });
    localStorage.setItem('todos', JSON.stringify(updated));
  },
  reorder: (newTodos) => {
    set({ todos: newTodos });
    localStorage.setItem('todos', JSON.stringify(newTodos));
  },
});

export default todoSlice;
