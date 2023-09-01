import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { getUserAuthData } from 'entities/User';
import { AppRoutes, RoutePath } from 'shared/config/routerConfig/routerConfig';

export function RequireAuth({ children }: {children: JSX.Element}) {
  const auth = useSelector(getUserAuthData);
  const location = useLocation();

  if (!auth?.username) {
    return <Navigate to={RoutePath[AppRoutes.MAIN]} state={{ from: location }} replace />;
  }

  return children;
}
