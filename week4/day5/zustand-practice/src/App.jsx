import React, { useState } from 'react';
import AuthStatus from './components/AuthStatus';
import CartStatus from './components/CartStatus';
import ModalToggle from './components/ModalToggle';
import UserList from './components/UserList';
import PerformanceTest from './components/PerformanceTest';
import TodoStats from './components/DerivedState';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const { toggleTheme } = useTheme();
  const [showPerformanceTest, setShowPerformanceTest] = useState(false);
  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white space-y-6">
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-gray-700 text-white rounded">Toggle Theme</button>
      <AuthStatus />
      <CartStatus />
      <ModalToggle />
      <UserList />
      <button
        onClick={() => setShowPerformanceTest((prev) => !prev)}
        className="px-4 py-2 bg-indigo-600 text-white rounded">
        {showPerformanceTest ? 'Hide' : 'Show'} Performance Test
      </button>
      {showPerformanceTest && <PerformanceTest />}
      <TodoStats />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
