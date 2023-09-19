import { ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { getUserAuthData, getUserRoles } from 'entities/User';
import { AppRoutes, RoutePath } from 'shared/config/routerConfig/routerConfig';
import { UserRole } from 'entities/User/model/types/user';

interface RequireAuthProps {
  children: ReactNode;
  roles?: UserRole[];
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
  const auth = useSelector(getUserAuthData);
  const location = useLocation();
  const userRoles = useSelector(getUserRoles);

  const hasRequiredRoles = useMemo(() => {
    if (!roles) {
      return true;
    }

    return roles.some((requiredRole) => Boolean(userRoles?.includes(requiredRole)));
  }, [roles, userRoles]);

  if (!auth) {
    return <Navigate to={RoutePath[AppRoutes.MAIN]} state={{ from: location }} replace />;
  }

  if (!hasRequiredRoles) {
    return <Navigate to={RoutePath[AppRoutes.FORBIDDEN]} state={{ from: location }} replace />;
  }

  return children as JSX.Element;
}
