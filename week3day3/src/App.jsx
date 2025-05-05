import ThemeToggler from './components/ThemeToggler';
import ThemeBox from './components/ThemeBox';
import PreviousValueDemo from './components/PreviousValue';
import DebouncedSearch from './components/DebouncedSearch';

export default function App() {
  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center">React Advanced Hooks + Context</h1>
      <ThemeToggler />
      <ThemeBox />
      <PreviousValueDemo />
      <DebouncedSearch />
    </div>
  );
}
