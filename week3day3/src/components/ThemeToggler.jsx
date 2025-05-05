import { useTheme } from '../context/ThemeContext';

export default function ThemeToggler() {
  const { theme, toggle } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow transition duration-300"
      aria-label={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
    >
      <i className={`fas ${isLight ? 'fa-moon' : 'fa-sun'}`}></i>
      {isLight ? 'Dark' : 'Light'} Mode
    </button>
  );
}
