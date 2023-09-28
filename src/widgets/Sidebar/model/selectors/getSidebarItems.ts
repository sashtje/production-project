import { createSelector } from '@reduxjs/toolkit';

import { getUserAuthData } from '@/entities/User';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';
import AboutIcon from '@/shared/assets/icons/about-20-20.svg';
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg';
import ArticlesIcon from '@/shared/assets/icons/article-20-20.svg';
import {
  AppRoutes, getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile,
} from '@/shared/const/router';

import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userData) => {
    const sidebarItemsList: SidebarItemType[] = [
      {
        path: getRouteMain(),
        text: 'Главная страница',
        Icon: MainIcon,
        tFileName: AppRoutes.MAIN,
      },
      {
        path: getRouteAbout(),
        text: 'О сайте',
        Icon: AboutIcon,
        tFileName: AppRoutes.ABOUT,
      },
    ];

    if (userData) {
      sidebarItemsList.push(
        {
          path: getRouteProfile(userData.id),
          text: 'Profile page',
          Icon: ProfileIcon,
          tFileName: AppRoutes.PROFILE,
          authOnly: true,
        },
        {
          path: getRouteArticles(),
          text: 'Articles page',
          Icon: ArticlesIcon,
          tFileName: AppRoutes.ARTICLES,
          authOnly: true,
        },
      );
    }

    return sidebarItemsList;
  },
);
