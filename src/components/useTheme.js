import { useState, useEffect } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState('light'); // default theme

  // on mount, read the theme from localStorage
  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  return [theme, toggleTheme];
};

export default useTheme;
