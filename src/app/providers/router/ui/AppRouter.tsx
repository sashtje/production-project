import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routerConfig } from 'shared/config/routerConfig';

export const AppRouter = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {Object.values(routerConfig).map(({ path, element }) => (
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
