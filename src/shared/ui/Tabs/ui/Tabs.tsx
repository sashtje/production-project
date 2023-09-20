import { memo, useCallback } from 'react';

import { classNames } from 'shared/lib/classNames';

import { TabItem, TabsProps } from '../types';
import { Card, CardTheme } from '../../Card';
import cls from './Tabs.module.scss';

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
