import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui/deprecated/Button';
import { classNames } from '@/shared/lib/classNames';
import { getArticleDetails } from '@/entities/Article';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';

import { getCanEditArticle } from '../../model/selectors/article';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
  const { className } = props;
  const { t } = useTranslation('articles');

  const navigate = useNavigate();
  const onBackToList = useCallback(() => {
    navigate(getRouteArticles());
  }, [navigate]);

  const canEditArticle = useSelector(getCanEditArticle);
  const article = useSelector(getArticleDetails);
  const onEditArticle = useCallback(() => {
    if (article?.id) {
      navigate(getRouteArticleEdit(article.id));
    }
  }, [navigate, article]);

  return (
    <HStack max justify="between" className={classNames('', {}, [className])}>
      <Button onClick={onBackToList}>{t('Назад к списку')}</Button>

      {canEditArticle && <Button onClick={onEditArticle}>{t('Редактировать')}</Button>}
    </HStack>
  );
});

ArticleDetailsPageHeader.displayName = 'ArticleDetailsPageHeader';
