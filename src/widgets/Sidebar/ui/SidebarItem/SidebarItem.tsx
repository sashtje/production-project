import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { AppLink as AppLinkDeprecated, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { classNames } from '@/shared/lib/classNames';
import { getUserAuthData } from '@/entities/User';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';

import { SidebarItemType } from '../../model/types/sidebar';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
  const { item, collapsed } = props;
  const { path, text, tFileName, authOnly } = item;

  const { t } = useTranslation(tFileName);

  const isAuth = useSelector(getUserAuthData);

  if (authOnly && !isAuth) {
    return null;
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <AppLink
          to={path}
          className={classNames(cls.item, { [cls.collapsedRedesigned]: collapsed }, [])}
        >
          <Icon Svg={item.Icon} />

          <span className={cls.link}>{t(text)}</span>
        </AppLink>
      }
      off={
        <AppLinkDeprecated
          theme={AppLinkTheme.SECONDARY}
          to={path}
          className={classNames(cls.item, { [cls.collapsed]: collapsed }, [])}
        >
          <item.Icon className={cls.icon} />

          <span className={cls.link}>{t(text)}</span>
        </AppLinkDeprecated>
      }
    />
  );
});

SidebarItem.displayName = 'SidebarItem';
