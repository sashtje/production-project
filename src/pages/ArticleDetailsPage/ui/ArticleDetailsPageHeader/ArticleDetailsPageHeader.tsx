import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button } from 'shared/ui';
import { classNames } from 'shared/lib/classNames';
import { AppRoutes, RoutePath } from 'shared/config/routerConfig/routerConfig';
import { getArticleDetails } from 'entities/Article';

import { getCanEditArticle } from '../../model/selectors/article';
import cls from './ArticleDetailsPageHeader.module.scss';

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
    <div className={classNames(cls.articleDetailsPageHeader, {}, [className])}>
      <Button onClick={onBackToList}>
        {t('Назад к списку')}
      </Button>

      {canEditArticle && (
        <Button
          className={cls.editBtn}
          onClick={onEditArticle}
        >
          {t('Редактировать')}
        </Button>
      )}
    </div>
  );
});

ArticleDetailsPageHeader.displayName = 'ArticleDetailsPageHeader';
