import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames';
import { Select, SelectOption } from 'shared/ui/Select';
import { SortOrder } from 'shared/types';

import { ArticleSortField } from '../../model/consts/consts';
import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField,
  order: SortOrder,
  onChangeSort: (newSort: ArticleSortField) => void,
  onChangeOrder: (newOrder: SortOrder) => void,
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const {
    className,
    sort,
    order,
    onChangeSort,
    onChangeOrder,
  } = props;

  const { t } = useTranslation('articles');
  const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
    {
      value: 'asc',
      content: t('возрастанию'),
    },
    {
      value: 'desc',
      content: t('убыванию'),
    },
  ], [t]);

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
    {
      value: ArticleSortField.CREATED_AT,
      content: t('дате создания'),
    },
    {
      value: ArticleSortField.TITLE,
      content: t('названию'),
    },
    {
      value: ArticleSortField.VIEWS,
      content: t('просмотрам'),
    },
  ], [t]);

  return (
    <div className={classNames(cls.articleSortSelector, {}, [className])}>
      <Select<ArticleSortField>
        label={t('Сортировать ПО')}
        options={sortFieldOptions}
        value={sort}
        onChange={onChangeSort}
      />

      <Select<SortOrder>
        options={orderOptions}
        label={t('по')}
        value={order}
        onChange={onChangeOrder}
        className={cls.order}
      />
    </div>
  );
});

ArticleSortSelector.displayName = 'ArticleSortSelector';
