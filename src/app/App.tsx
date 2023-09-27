import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Navbar, Sidebar } from '@/widgets';
import { classNames } from '@/shared/lib/classNames';
import { getUserInited, userActions } from '@/entities/User';

import { AppRouter } from './providers/router';

export function App() {
  const dispatch = useDispatch();
  const inited = useSelector(getUserInited);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames('app', {}, [])}>
      <Suspense fallback="">
        <Navbar />

        <div className="content-page">
          <Sidebar />
          {inited && <AppRouter />}
        </div>
      </Suspense>
    </div>
  );
}
