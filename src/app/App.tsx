import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Navbar, Sidebar } from '@/widgets';
import { classNames } from '@/shared/lib/classNames';
import { getUserInited, initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLoaderLayout, MainLayout } from '@/shared/layouts';
import { PageLoader } from '@/widgets/PageLoader';

import { useAppToolbar } from './lib/useAppToolbar';
import { AppRouter } from './providers/router';

export function App() {
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);

  const toolbar = useAppToolbar();

  useEffect(() => {
    if (!inited) {
      dispatch(initAuthData());
    }
  }, [dispatch, inited]);

  if (!inited) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <div className={classNames('app_redesigned', {}, [])}>
            <AppLoaderLayout />
          </div>
        }
        off={<PageLoader />}
      />
    );
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <div className={classNames('app_redesigned', {}, [])}>
          <Suspense fallback="">
            <MainLayout
              header={<Navbar />}
              sidebar={<Sidebar />}
              content={<AppRouter />}
              toolbar={toolbar}
            />
          </Suspense>
        </div>
      }
      off={
        <div className={classNames('app', {}, [])}>
          <Suspense fallback="">
            <Navbar />

            <div className="content-page">
              <Sidebar />
              <AppRouter />
            </div>
          </Suspense>
        </div>
      }
    />
  );
}
