import { createSelector } from '@reduxjs/toolkit';

import { getUserAuthData } from '@/entities/User';
import MainIconDeprecated from '@/shared/assets/icons/main-20-20.svg';
import AboutIconDeprecated from '@/shared/assets/icons/about-20-20.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile-20-20.svg';
import ArticlesIconDeprecated from '@/shared/assets/icons/article-20-20.svg';
import MainIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/info.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import ArticlesIcon from '@/shared/assets/icons/article.svg';
import {
  AppRoutes,
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from '@/shared/const/router';
import { toggleFeatures } from '@/shared/lib/features';

import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      text: 'Главная страница',
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        on: () => MainIcon,
        off: () => MainIconDeprecated,
      }),
      tFileName: AppRoutes.MAIN,
    },
    {
      path: getRouteAbout(),
      text: 'О сайте',
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        on: () => AboutIcon,
        off: () => AboutIconDeprecated,
      }),
      tFileName: AppRoutes.ABOUT,
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: getRouteProfile(userData.id),
        text: 'Profile page',
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          on: () => ProfileIcon,
          off: () => ProfileIconDeprecated,
        }),
        tFileName: AppRoutes.PROFILE,
        authOnly: true,
      },
      {
        path: getRouteArticles(),
        text: 'Articles page',
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          on: () => ArticlesIcon,
          off: () => ArticlesIconDeprecated,
        }),
        tFileName: AppRoutes.ARTICLES,
        authOnly: true,
      },
    );
  }

  return sidebarItemsList;
});
