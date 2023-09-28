import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { UserRole } from '@/entities/User';
import {
  AppRoutes,
  getRouteAbout, getRouteAdminPanel,
  getRouteArticleCreate, getRouteArticleEdit,
  getRouteArticles,
  getRouteArticlesDetails, getRouteForbidden,
  getRouteMain, getRouteNotFound,
  getRouteProfile,
} from '@/shared/const/router';

import { AppRoutesProps } from './types';

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
  [AppRoutes.ABOUT]: {
    path: getRouteAbout(),
    element: <AboutPage />,
  },
  [AppRoutes.PROFILE]: {
    path: getRouteProfile(':id'),
    element: <ProfilePage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLES]: {
    path: getRouteArticles(),
    element: <ArticlesPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_DETAILS]: {
    path: getRouteArticlesDetails(':id'),
    element: <ArticleDetailsPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_CREATE]: {
    path: getRouteArticleCreate(),
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_EDIT]: {
    path: getRouteArticleEdit(':id'),
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [AppRoutes.ADMIN_PANEL]: {
    path: getRouteAdminPanel(),
    element: <AdminPanelPage />,
    authOnly: true,
    roles: [UserRole.ADMIN, UserRole.MANAGER],
  },
  [AppRoutes.FORBIDDEN]: {
    path: getRouteForbidden(),
    element: <ForbiddenPage />,
  },

  // last
  [AppRoutes.NOT_FOUND]: {
    path: getRouteNotFound(),
    element: <NotFoundPage />,
  },
};
