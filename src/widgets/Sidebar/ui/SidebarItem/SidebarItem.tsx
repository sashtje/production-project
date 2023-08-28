import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/ui/AppLink';
import { classNames } from 'shared/lib/classNames';

import { SidebarItemType } from '../../model/items';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
  const { item, collapsed } = props;
  const {
    path, text, Icon, tFileName,
  } = item;

  const { t } = useTranslation(tFileName);

  return (
    <AppLink
      theme={AppLinkTheme.SECONDARY}
      to={path}
      className={classNames(cls.item, { [cls.collapsed]: collapsed }, [])}
    >
      <Icon className={cls.icon} />

      <span className={cls.link}>
        {t(text)}
      </span>
    </AppLink>
  );
});

SidebarItem.displayName = 'SidebarItem';
