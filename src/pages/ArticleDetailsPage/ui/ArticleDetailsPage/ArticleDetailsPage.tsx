import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames';

import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
}

export const ArticleDetailsPage = memo((props: ArticleDetailsPageProps) => {
  const { className } = props;

  const { t } = useTranslation('article');

  return (
    <div className={classNames(cls.articleDetailsPage, {}, [className])}>
      {t('Статья')}
    </div>
  );
});

ArticleDetailsPage.displayName = 'ArticleDetailsPage';
