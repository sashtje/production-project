import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Card } from 'shared/ui/Card';
import { Input } from 'shared/ui/Input';
import { SortOrder } from 'shared/types';
import { classNames } from 'shared/lib/classNames';
import {
  ArticleView, ArticleViewSelector, ArticleSortSelector, ArticleSortField,
} from 'entities/Article';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';

import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import cls from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
  const { className } = props;

  const { t } = useTranslation('articles');
  const dispatch = useAppDispatch();
  const view = useSelector(getArticlesPageView);
  const sort = useSelector(getArticlesPageSort);
  const order = useSelector(getArticlesPageOrder);
  const search = useSelector(getArticlesPageSearch);

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 500);

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view));
    dispatch(articlesPageActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  const onChangeSort = useCallback((newSort: ArticleSortField) => {
    dispatch(articlesPageActions.setSort(newSort));
    dispatch(articlesPageActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  const onChangeOrder = useCallback((newOrder: SortOrder) => {
    dispatch(articlesPageActions.setOrder(newOrder));
    dispatch(articlesPageActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  const onChangeSearch = useCallback((newSearch: string) => {
    dispatch(articlesPageActions.setSearch(newSearch));
    dispatch(articlesPageActions.setPage(1));
    debouncedFetchData();
  }, [dispatch, debouncedFetchData]);

  return (
    <div className={classNames(cls.articlesPageFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector
          sort={sort}
          order={order}
          onChangeSort={onChangeSort}
          onChangeOrder={onChangeOrder}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>

      <Card className={cls.search}>
        <Input
          placeholder={t('Поиск')}
          value={search}
          onChange={onChangeSearch}
        />
      </Card>
    </div>
  );
});

ArticlesPageFilters.displayName = 'ArticlesPageFilters';
