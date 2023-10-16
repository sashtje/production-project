import { ReactNode, useEffect, useMemo, useState } from 'react';

import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { Theme } from '@/shared/const/theme';
import { useJsonSettings } from '@/entities/User';

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, initialTheme } = props;
  const { theme: defaultTheme } = useJsonSettings();
  const [isThemeInited, setThemeInited] = useState(false);
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme || Theme.LIGHT);

  useEffect(() => {
    if (!isThemeInited && !initialTheme && defaultTheme) {
      setTheme(defaultTheme);
      setThemeInited(true);
      (document.childNodes[1] as HTMLElement).className = defaultTheme;
    }
  }, [defaultTheme, initialTheme, isThemeInited]);

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};
