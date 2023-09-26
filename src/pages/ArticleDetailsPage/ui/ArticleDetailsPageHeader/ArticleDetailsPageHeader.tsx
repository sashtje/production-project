import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui';
import { classNames } from '@/shared/lib/classNames';
import { getArticleDetails } from '@/entities/Article';
import { HStack } from '@/shared/ui/Stack';

import { getCanEditArticle } from '../../model/selectors/article';
import { AppRoutes, RoutePath } from '@/shared/const/router';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
  const { className } = props;
  const { t } = useTranslation('articles');

  const navigate = useNavigate();
  const onBackToList = useCallback(() => {
    navigate(RoutePath[AppRoutes.ARTICLES]);
  }, [navigate]);

  const canEditArticle = useSelector(getCanEditArticle);
  const article = useSelector(getArticleDetails);
  const onEditArticle = useCallback(() => {
    navigate(`${RoutePath[AppRoutes.ARTICLES]}/${article?.id}/edit`);
  }, [navigate, article]);

  return (
    <HStack max justify="between" className={classNames('', {}, [className])}>
      <Button onClick={onBackToList}>
        {t('Назад к списку')}
      </Button>

      {canEditArticle && (
        <Button
          onClick={onEditArticle}
        >
          {t('Редактировать')}
        </Button>
      )}
    </HStack>
  );
});

ArticleDetailsPageHeader.displayName = 'ArticleDetailsPageHeader';
