import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames';
import { Text, TextSize } from 'shared/ui/Text';
import { ArticleList } from 'entities/Article';
import { VStack } from 'shared/ui/Stack';

import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
  const { className } = props;
  const { t } = useTranslation('articles');
  const { data: articles, isLoading, error } = useArticleRecommendationsList(3);

  if (isLoading || error) {
    return null;
  }

  return (
    <VStack gap="8" className={classNames('', {}, [className])}>
      <Text
        size={TextSize.L}
        title={t('Рекомендуем')}
      />

      <ArticleList
        articles={articles}
        target="_blank"
      />
    </VStack>
  );
});

ArticleRecommendationsList.displayName = 'ArticleRecommendationsList';