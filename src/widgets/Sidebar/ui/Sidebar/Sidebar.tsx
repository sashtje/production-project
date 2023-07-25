import { useState } from 'react';

import { classNames } from 'shared/lib/classNames';
import { ThemeSwitcher, LangSwitcher, Button } from 'shared/ui';

import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}
    >
      <Button data-testid="sidebar-toggle" type="button" onClick={onToggle}>toggle</Button>

      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher />
      </div>
    </div>
  );
};
