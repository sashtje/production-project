import { lazy } from 'react';

export const ForbiddenPageAsync = lazy(
  () => import('./ForbiddenPage')
    .then((module) => ({ default: module.ForbiddenPage })),
);
