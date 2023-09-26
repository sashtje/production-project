import React, { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PageLoader } from '@/widgets/PageLoader';

import { routerConfig, AppRoutesProps } from '../config';
import { RequireAuth } from './RequireAuth';

export const AppRouter = memo(() => {
  const renderWithWrapper = useCallback(
    ({
      path, element, authOnly, roles,
    }: AppRoutesProps) => (
      <Route
        key={path}
        path={path}
        element={authOnly ? <RequireAuth roles={roles}>{element}</RequireAuth> : element}
      />
    ),
    [],
  );

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {Object.values(routerConfig).map(renderWithWrapper)}
      </Routes>
    </Suspense>
  );
});

AppRouter.displayName = 'AppRouter';
