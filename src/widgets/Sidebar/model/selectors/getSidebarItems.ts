import { createSelector } from '@reduxjs/toolkit';

import { getUserAuthData } from '@/entities/User';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';
import AboutIcon from '@/shared/assets/icons/about-20-20.svg';
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg';
import ArticlesIcon from '@/shared/assets/icons/article-20-20.svg';

import { SidebarItemType } from '../types/sidebar';
import { AppRoutes, RoutePath } from '@/shared/const/router';

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userData) => {
    const sidebarItemsList: SidebarItemType[] = [
      {
        path: RoutePath.main,
        text: 'Главная страница',
        Icon: MainIcon,
        tFileName: AppRoutes.MAIN,
      },
      {
        path: RoutePath.about,
        text: 'О сайте',
        Icon: AboutIcon,
        tFileName: AppRoutes.ABOUT,
      },
    ];

    if (userData) {
      sidebarItemsList.push(
        {
          path: RoutePath.profile + userData.id,
          text: 'Profile page',
          Icon: ProfileIcon,
          tFileName: AppRoutes.PROFILE,
          authOnly: true,
        },
        {
          path: RoutePath.articles,
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
