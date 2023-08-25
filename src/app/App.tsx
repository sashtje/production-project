import { Suspense } from 'react';

import { AppRouter } from 'app/providers/router';
import { Navbar, Sidebar } from 'widgets';
import { classNames } from 'shared/lib/classNames';

export function App() {
  return (
    <div className={classNames('app', {}, [])}>
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
