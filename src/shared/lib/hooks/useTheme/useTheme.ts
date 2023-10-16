import { useContext, useEffect } from 'react';

import { Theme } from '@/shared/const/theme';
import { toggleFeatures } from '@/shared/lib/features';

import { ThemeContext } from '../../context/ThemeContext';

interface UseThemeResult {
  toggleTheme: (saveAction: (theme: Theme) => void) => void;
  theme: Theme;
  setTheme?: (theme: Theme) => void;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = `${toggleFeatures({
      name: 'isAppRedesigned',
      on: () => 'redesigned',
      off: () => '',
    })} ${theme || Theme.LIGHT}`;
  }, [theme]);

  const toggleTheme = (saveAction: (theme: Theme) => void) => {
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

    saveAction?.(newTheme);
  };

  return { theme: theme || Theme.LIGHT, toggleTheme, setTheme };
}
