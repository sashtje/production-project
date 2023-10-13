import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ArticalAdditionalInfo } from '@/widgets/ArticalAdditionalInfo';
import { Card } from '@/shared/ui/redesigned/Card';
import { getArticleDetails } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames';
import { getRouteArticleEdit } from '@/shared/const/router';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';

import cls from './AdditionalInfoContainer.module.scss';

interface AdditionalInfoContainerProps {
  className?: string;
}

export const AdditionalInfoContainer = memo((props: AdditionalInfoContainerProps) => {
  const { className } = props;
  const article = useSelector(getArticleDetails);
  const navigate = useNavigate();

  const onEditArticle = useCallback(() => {
    if (article?.id) {
      navigate(getRouteArticleEdit(article.id));
    }
  }, [navigate, article]);

  if (!article) {
    return (
      <Card padding="24" borderRadius="round" className={classNames(cls.card, {}, [className])}>
        <VStack gap="32">
          <Skeleton width={200} height={24} />
          <Skeleton width={200} height={38} />
          <Skeleton width={200} height={24} />
        </VStack>
      </Card>
    );
  }

  return (
    <Card padding="24" borderRadius="round" className={classNames(cls.card, {}, [className])}>
      <ArticalAdditionalInfo
        onEdit={onEditArticle}
        author={article.user}
        createdAt={article.createdAt}
        views={article.views}
      />
    </Card>
  );
});

AdditionalInfoContainer.displayName = 'AdditionalInfoContainer';
