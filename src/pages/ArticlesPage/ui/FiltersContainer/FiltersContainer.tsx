import { memo } from 'react';

import { ArticlesFilters } from '@/widgets/ArticlesFilters';

import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
  const { className } = props;
  const { search, order, sort, onChangeSearch, onChangeType, type, onChangeSort, onChangeOrder } =
    useArticleFilters();

  return (
    <ArticlesFilters
      className={className}
      type={type}
      order={order}
      search={search}
      sort={sort}
      onChangeSearch={onChangeSearch}
      onChangeType={onChangeType}
      onChangeSort={onChangeSort}
      onChangeOrder={onChangeOrder}
    />
  );
});

FiltersContainer.displayName = 'FiltersContainer';
