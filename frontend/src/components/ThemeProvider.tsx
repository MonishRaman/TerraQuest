import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type ThemeContextShape = { theme: Theme; toggle: () => void };

const ThemeContext = createContext<ThemeContextShape | undefined>(undefined);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('theme');
      return (saved as Theme) || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    const cls = theme === 'dark' ? 'theme-dark' : 'theme-light';
    const removed = theme === 'dark' ? 'theme-light' : 'theme-dark';
    document.documentElement.classList.remove(removed);
    document.documentElement.classList.add(cls);
    try {
      localStorage.setItem('theme', theme);
    } catch {}
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
