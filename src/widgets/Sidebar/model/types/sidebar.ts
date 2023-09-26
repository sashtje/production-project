import { SVGProps, VFC } from 'react';

import { AppRoutes } from '@/shared/const/router';

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: VFC<SVGProps<SVGSVGElement>>;
  tFileName: AppRoutes;
  authOnly?: boolean;
}
