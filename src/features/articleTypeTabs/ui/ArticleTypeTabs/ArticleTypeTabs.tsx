import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { TabItem, Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';
import { Tabs } from '@/shared/ui/redesigned/Tabs';
import { classNames } from '@/shared/lib/classNames';
import { ArticleType } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const { className, value, onChangeType } = props;
  const { t } = useTranslation('articles');

  const typeTabs = useMemo<TabItem[]>(
    () => [
      {
        value: ArticleType.ALL,
        content: t('Все статьи'),
      },
      {
        value: ArticleType.IT,
        content: t('IT'),
      },
      {
        value: ArticleType.ECONOMICS,
        content: t('Экономика'),
      },
      {
        value: ArticleType.SCIENCE,
        content: t('Наука'),
      },
    ],
    [t],
  );

  const onTabClick = useCallback(
    (activeTab: TabItem) => {
      onChangeType(activeTab.value as ArticleType);
    },
    [onChangeType],
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Tabs
          className={classNames('', {}, [className])}
          value={value}
          tabs={typeTabs}
          onTabClick={onTabClick}
          direction="column"
        />
      }
      off={
        <TabsDeprecated
          className={classNames('', {}, [className])}
          value={value}
          tabs={typeTabs}
          onTabClick={onTabClick}
        />
      }
    />
  );
});

ArticleTypeTabs.displayName = 'ArticleTypeTabs';
