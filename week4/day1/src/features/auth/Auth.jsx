import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { login, logout } from './authSlice';

export default function Auth() {
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const mockToken = `${Date.now()}`; 
    dispatch(login({
      token: mockToken,
      username: formUsername,
      password: formPassword,
    }));
    setFormUsername('');
    setFormPassword('');
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold">Auth</h2>

      {isAuthenticated ? (
        <>
          <p className="mb-2 break-all">Token: {token}</p>
          <button
            onClick={() => dispatch(logout())}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto">
          <input
            type="text"
            placeholder="Username"
            value={formUsername}
            required
            onChange={(e) => setFormUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={formPassword}
            required
            onChange={(e) => setFormPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
}
