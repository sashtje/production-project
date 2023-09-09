import { memo, ReactNode, useCallback } from 'react';

import { classNames } from 'shared/lib/classNames';
import { Card, CardTheme } from 'shared/ui/Card';

import cls from './Tabs.module.scss';

export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (activeTab: TabItem) => void;
}

export const Tabs = memo((props: TabsProps) => {
  const {
    className,
    tabs,
    value,
    onTabClick,
  } = props;

  const tabClickHandle = useCallback((tab: TabItem) => () => {
    onTabClick(tab);
  }, [onTabClick]);

  return (
    <div className={classNames(cls.tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          key={tab.value}
          className={cls.tab}
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          onClick={tabClickHandle(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
});

Tabs.displayName = 'Tabs';
