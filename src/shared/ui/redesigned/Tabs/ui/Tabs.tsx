import { memo, ReactNode, useCallback } from 'react';

import { classNames } from '@/shared/lib/classNames';

import { FlexDirection, Flex } from '../../Stack';
import { Card } from '../../Card';
import cls from './Tabs.module.scss';

export interface TabItem {
  value: string;
  content: ReactNode;
}

export interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (activeTab: TabItem) => void;
  direction?: FlexDirection;
}

export const Tabs = memo((props: TabsProps) => {
  const { className, tabs, value, onTabClick, direction = 'row' } = props;

  const tabClickHandle = useCallback(
    (tab: TabItem) => () => {
      onTabClick(tab);
    },
    [onTabClick],
  );

  return (
    <Flex
      direction={direction}
      align="start"
      gap="8"
      className={classNames(cls.tabs, {}, [className])}
    >
      {tabs.map((tab) => {
        const isSelected = tab.value === value;

        return (
          <Card
            key={tab.value}
            className={classNames(cls.tab, { [cls.selected]: isSelected }, [])}
            variant={tab.value === value ? 'light' : 'normal'}
            onClick={tabClickHandle(tab)}
            borderRadius="round"
          >
            {tab.content}
          </Card>
        );
      })}
    </Flex>
  );
});

Tabs.displayName = 'Tabs';
