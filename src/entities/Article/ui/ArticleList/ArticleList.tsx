import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { classNames } from '@/shared/lib/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { HStack } from '@/shared/ui/redesigned/Stack';

import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleView } from '../../model/consts/consts';
import { Article } from '../../model/types/article';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => <ArticleListItemSkeleton className={cls.card} key={index} view={view} />);

export const ArticleList = memo((props: ArticleListProps) => {
  const { className, articles, isLoading, view = ArticleView.SMALL, target } = props;
  const { t } = useTranslation('articles');

  if (!isLoading && !articles.length) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <div className={classNames(cls.articleListRedesigned, {}, [className, cls[view]])}>
            <Text size="l" title={t('Статьи не найдены')} />
          </div>
        }
        off={
          <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
            <TextDeprecated size={TextSize.L} title={t('Статьи не найдены')} />
          </div>
        }
      />
    );
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <HStack
          wrap="wrap"
          justify="center"
          gap="24"
          data-testid="ArticleList"
          className={classNames(cls.articleListRedesigned, {}, [className])}
        >
          {articles.map((item) => (
            <ArticleListItem
              article={item}
              view={view}
              target={target}
              key={item.id}
              className={cls.card}
            />
          ))}

          {isLoading && getSkeletons(view)}
        </HStack>
      }
      off={
        <div
          data-testid="ArticleList"
          className={classNames(cls.articleList, {}, [className, cls[view]])}
        >
          {articles.map((item) => (
            <ArticleListItem
              article={item}
              view={view}
              target={target}
              key={item.id}
              className={cls.card}
            />
          ))}

          {isLoading && getSkeletons(view)}
        </div>
      }
    />
  );
});

ArticleList.displayName = 'ArticleList';
