import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppRouter } from 'app/providers/router';
import { Navbar, Sidebar } from 'widgets';
import { classNames } from 'shared/lib/classNames';
import { userActions } from 'entities/User';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

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
