import { memo } from 'react';

import { classNames } from 'shared/lib/classNames';
import { ArticleList, ArticleView } from 'entities/Article';

import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

export const ArticlesPage = memo((props: ArticlesPageProps) => {
  const { className } = props;

  return (
    <div className={classNames(cls.articlesPage, {}, [className])}>
      <ArticleList
        isLoading
        view={ArticleView.BIG}
        articles={[]}
      />
    </div>
  );
});

ArticlesPage.displayName = 'ArticlesPage';
