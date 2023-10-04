import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames';
import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';

import {
  useGetArticleRating,
  useSaveArticleRating,
} from '../../api/articleRatingApi';

export interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

export const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className, articleId } = props;
  const { t } = useTranslation('articles');

  const authData = useSelector(getUserAuthData);
  const { data, isLoading } = useGetArticleRating({
    userId: authData?.id ?? '',
    articleId,
  });
  const [saveArticle] = useSaveArticleRating();

  const handleRateArticle = useCallback(
    (starsCount: number, feedback?: string) => {
      saveArticle({
        articleId,
        userId: authData?.id ?? '',
        rate: starsCount,
        feedback,
      });
    },
    [articleId, authData?.id, saveArticle],
  );

  const onCancel = useCallback(
    (starsCount: number) => {
      handleRateArticle(starsCount);
    },
    [handleRateArticle],
  );

  const onAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      handleRateArticle(starsCount, feedback);
    },
    [handleRateArticle],
  );

  if (isLoading) {
    return <Skeleton width="100%" height={120} />;
  }

  const rating = data?.[0];

  return (
    <RatingCard
      className={classNames('', {}, [className])}
      title={t('Оцените статью')}
      feedbackTitle={t('Оставьте свой отзыв о статье')}
      hasFeedback
      rate={rating?.rate}
      onAccept={onAccept}
      onCancel={onCancel}
    />
  );
});

ArticleRating.displayName = 'ArticleRating';
