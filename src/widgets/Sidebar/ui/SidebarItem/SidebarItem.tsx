import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';
import { classNames } from '@/shared/lib/classNames';
import { getUserAuthData } from '@/entities/User';

import { SidebarItemType } from '../../model/types/sidebar';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
  const { item, collapsed } = props;
  const { path, text, Icon, tFileName, authOnly } = item;

  const { t } = useTranslation(tFileName);

  const isAuth = useSelector(getUserAuthData);

  if (authOnly && !isAuth) {
    return null;
  }

  return (
    <AppLink
      theme={AppLinkTheme.SECONDARY}
      to={path}
      className={classNames(cls.item, { [cls.collapsed]: collapsed }, [])}
    >
      <Icon className={cls.icon} />

      <span className={cls.link}>{t(text)}</span>
    </AppLink>
  );
});

SidebarItem.displayName = 'SidebarItem';
