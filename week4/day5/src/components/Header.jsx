import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import useBoundStore from '../slices/store';
import MultiStepForm from './MultiStepForm';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const isLoggedIn = useBoundStore((s) => s.isLoggedIn);
  const logout = useBoundStore((s) => s.logout);
  const login = useBoundStore((s) => s.login);
  const [showRegister, setShowRegister] = useState(false); 
  return (
    <header className="bg-black text-white p-4 flex flex-col items-start gap-4">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-xl font-bold">Todo List</h1>
        <div className="flex gap-4">
          <button onClick={toggleTheme}>Toggle {theme} mode</button>
          {isLoggedIn ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <>
            <button onClick={()=>login}>login</button>
              <button onClick={() => setShowRegister(!showRegister)}>
                {showRegister ? 'Close Register' : 'Register'}
              </button>
            </>
          )}
        </div>
      </div>

      {!isLoggedIn && showRegister && (
        <div className="w-full mt-4">
          <MultiStepForm onClose={() => setShowRegister(false)} />
        </div>
      )}
    </header>
  );
}
