import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames';
import { Page } from 'widgets/Page';

import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
  className?: string;
}

export const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const { className } = props;
  const { t } = useTranslation('articles');
  const { id } = useParams<{id: string}>();
  const isEdit = Boolean(id);

  return (
    <Page className={classNames(cls.articleEditPage, {}, [className])}>
      {isEdit
        ? t('Редактирование статьи с ID = ') + id
        : t('Создание новой статьи')}
    </Page>
  );
});

ArticleEditPage.displayName = 'ArticleEditPage';
