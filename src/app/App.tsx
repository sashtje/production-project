import { Suspense } from 'react';

import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/router';
import { Navbar, Sidebar } from 'widgets';
import { classNames } from 'shared/lib/classNames';

export function App() {
  const { theme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar />

        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}
