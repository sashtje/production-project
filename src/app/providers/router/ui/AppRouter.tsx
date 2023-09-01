import React, { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PageLoader } from 'shared/ui/PageLoader';
import { routerConfig, AppRoutesProps } from 'shared/config/routerConfig';

import { RequireAuth } from './RequireAuth';

export const AppRouter = memo(() => {
  const renderWithWrapper = useCallback(({ path, element, authOnly }: AppRoutesProps) => {
    const routeElement = (
      <div className="page-wrapper">
        {element}
      </div>
    );

    return (
      <Route
        key={path}
        path={path}
        element={authOnly ? <RequireAuth>{routeElement}</RequireAuth> : routeElement}
      />
    );
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {Object.values(routerConfig).map(renderWithWrapper)}
      </Routes>
    </Suspense>
  );
});

AppRouter.displayName = 'AppRouter';
