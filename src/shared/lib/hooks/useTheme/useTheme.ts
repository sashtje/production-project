import { useContext, useEffect } from 'react';

import { Theme } from '@/shared/const/theme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';

import { ThemeContext } from '../../context/ThemeContext';

interface UseThemeResult {
    toggleTheme: () => void;
    theme: Theme;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = theme || Theme.LIGHT;
  }, [theme]);

  const toggleTheme = () => {
    let newTheme: Theme;

    switch (theme) {
    case Theme.LIGHT:
      newTheme = Theme.ORANGE;
      break;
    case Theme.DARK:
      newTheme = Theme.LIGHT;
      break;
    case Theme.ORANGE:
      newTheme = Theme.DARK;
      break;
    default:
      newTheme = Theme.LIGHT;
    }

    setTheme?.(newTheme);

    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return { theme: theme || Theme.LIGHT, toggleTheme };
}
