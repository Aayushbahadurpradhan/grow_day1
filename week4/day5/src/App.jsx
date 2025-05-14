import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
        <Header />
        <main className="p-4 max-w-5xl mx-auto">
          <TodoInput />
          <TodoList />
        </main>
      </div>
    </DndProvider>
  );
}
