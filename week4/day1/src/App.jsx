import { useSelector } from 'react-redux';
import Auth from './features/auth/Auth';
import Profile from './features/profile/Profile';
import Counter from './features/counter/counter';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Redux App</h1>
      <Auth />
      <Counter />
      {isAuthenticated && <Profile />}
    </div>
  );
}

export default App;
