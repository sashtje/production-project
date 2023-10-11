import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleView } from '@/entities/Article';
import { ArticleViewSelector } from '@/features/articleViewSelector';

import { getArticlesPageView } from '../../model/selectors/articlesPageSelectors';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';

interface ViewSelectorContainerProps {
  className?: string;
}

export const ViewSelectorContainer = memo((props: ViewSelectorContainerProps) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const view = useSelector(getArticlesPageView);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
      dispatch(articlesPageActions.setPage(1));
    },
    [dispatch],
  );

  return <ArticleViewSelector className={className} view={view} onViewClick={onChangeView} />;
});

ViewSelectorContainer.displayName = 'ViewSelectorContainer';
