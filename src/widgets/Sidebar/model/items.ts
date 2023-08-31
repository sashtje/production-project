import { SVGProps, VFC } from 'react';

import { AppRoutes, RoutePath } from 'shared/config/routerConfig/routerConfig';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg';

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: VFC<SVGProps<SVGSVGElement>>;
  tFileName: AppRoutes;
  authOnly?: boolean;
}

export const sidebarItemsList: SidebarItemType[] = [
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
  {
    path: RoutePath.profile,
    text: 'Profile page',
    Icon: ProfileIcon,
    tFileName: AppRoutes.PROFILE,
    authOnly: true,
  },
];
