import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleSortSelector } from '@/features/articleSortSelector';
import { Input } from '@/shared/ui/redesigned/Input';
import { ArticleTypeTabs } from '@/features/articleTypeTabs';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

import cls from './ArticlesFilters.module.scss';

interface ArticlesFiltersProps {
  className?: string;
  sort: ArticleSortField;
  onChangeSort: (newSort: ArticleSortField) => void;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  type: ArticleType;
  onChangeType: (type: ArticleType) => void;
  search: string;
  onChangeSearch: (value: string) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
  const {
    className,
    sort,
    onChangeSort,
    order,
    onChangeOrder,
    type,
    onChangeType,
    search,
    onChangeSearch,
  } = props;
  const { t } = useTranslation('articles');

  return (
    <Card className={classNames(cls.articlesFilters, {}, [className])} padding="24">
      <VStack gap="32">
        <Input
          placeholder={t('Поиск')}
          value={search}
          size="s"
          onChange={onChangeSearch}
          addonLeft={<Icon Svg={SearchIcon} />}
        />

        <ArticleTypeTabs className={cls.tabs} value={type} onChangeType={onChangeType} />

        <ArticleSortSelector
          sort={sort}
          order={order}
          onChangeSort={onChangeSort}
          onChangeOrder={onChangeOrder}
        />
      </VStack>
    </Card>
  );
});

ArticlesFilters.displayName = 'ArticlesFilters';
