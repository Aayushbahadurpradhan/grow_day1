import { createContext, useReducer, useContext, useEffect } from 'react';
const ThemeContext = createContext();
const themeReducer = (state, action) => {
    switch (action.type) {
      case 'TOGGLE': {
        const newTheme = state === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        return newTheme;
      }
      case 'INIT':
        return action.payload;
      default:
        return state;
    }
  };
  export const ThemeProvider = ({ children }) => {
  const [theme, dispatch] = useReducer(themeReducer, 'light');
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    dispatch({ type: 'INIT', payload: stored || (prefersDark ? 'dark' : 'light') });
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, toggle: () => dispatch({ type: 'TOGGLE' }) }}>
      <div className={`${theme} min-h-screen transition-colors`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
