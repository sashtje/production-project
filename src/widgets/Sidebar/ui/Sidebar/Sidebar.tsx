import { memo, useState } from 'react';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';
import { VStack } from '@/shared/ui/deprecated/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarItemsList = useSelector(getSidebarItems);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <aside
          data-testid="sidebar"
          className={classNames(cls.sidebarRedesigned, { [cls.collapsedRedesigned]: collapsed }, [
            className,
          ])}
        >
          <AppLogo size={collapsed ? 30 : 50} className={cls.appLogo} />

          <VStack role="navigation" gap="8" className={cls.items}>
            {sidebarItemsList.map((item) => (
              <SidebarItem key={item.path} item={item} collapsed={collapsed} />
            ))}
          </VStack>

          <Icon
            data-testid="sidebar-toggle"
            onClick={onToggle}
            clickable
            className={cls.collapseBtn}
            Svg={ArrowIcon}
          />
        </aside>
      }
      off={
        <aside
          data-testid="sidebar"
          className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}
        >
          <Button
            data-testid="sidebar-toggle"
            type="button"
            onClick={onToggle}
            className={cls.collapseBtn}
            theme={ButtonTheme.BACKGROUND_INVERTED}
            size={ButtonSize.L}
            square
          >
            {collapsed ? '>' : '<'}
          </Button>

          <VStack role="navigation" gap="8" className={cls.items}>
            {sidebarItemsList.map((item) => (
              <SidebarItem key={item.path} item={item} collapsed={collapsed} />
            ))}
          </VStack>

          <div className={cls.switchers}>
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} />
          </div>
        </aside>
      }
    />
  );
});

Sidebar.displayName = 'Sidebar';
