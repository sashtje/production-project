import { HTMLAttributeAnchorTarget, memo } from 'react';

import { ToggleFeatures } from '@/shared/lib/features';

import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned';
import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated';
import { ArticleView } from '../../model/consts/consts';
import { Article } from '../../model/types/article';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <ArticleListItemRedesigned
          className={className}
          article={article}
          view={view}
          target={target}
        />
      }
      off={
        <ArticleListItemDeprecated
          className={className}
          article={article}
          view={view}
          target={target}
        />
      }
    />
  );
});

ArticleListItem.displayName = 'ArticleListItem';
