import React from 'react';
import useStore from '../slices/store';

const AuthStatus = () => {
  const user = useStore((state) => state.user);
  const login = useStore((state) => state.login);
  const logout = useStore((state) => state.logout);

  return (
    <div className="p-4 border rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
      <h2 className="text-xl font-semibold mb-2">Auth Status</h2>
      {user ? (
        <div>
          <p>Logged in as: <strong>{user.name}</strong></p>
          <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded mt-2">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={login} className="px-3 py-1 bg-green-500 text-white rounded">
          Login (Random User)
        </button>
      )}
    </div>
  );
};

export default AuthStatus;
