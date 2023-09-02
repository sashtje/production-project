import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames';

import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

export const ArticlesPage = memo((props: ArticlesPageProps) => {
  const { className } = props;

  const { t } = useTranslation('articles');

  return (
    <div className={classNames(cls.articlesPage, {}, [className])}>
      {t('Список статей')}
    </div>
  );
});

ArticlesPage.displayName = 'ArticlesPage';
