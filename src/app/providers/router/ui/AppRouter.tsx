import React, { Suspense, useMemo, memo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { routerConfig } from 'shared/config/routerConfig';
import { PageLoader } from 'shared/ui/PageLoader';
import { getUserAuthData } from 'entities/User';

export const AppRouter = memo(() => {
  const isAuth = useSelector(getUserAuthData);

  const routes = useMemo(
    () => Object.values(routerConfig).filter((route) => isAuth || (!isAuth && !route.authOnly)),
    [isAuth],
  );

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={(
              <div className="page-wrapper">
                {element}
              </div>
            )}
          />
        ))}
      </Routes>
    </Suspense>
  );
});

AppRouter.displayName = 'AppRouter';
