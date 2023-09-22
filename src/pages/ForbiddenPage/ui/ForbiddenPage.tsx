import { VFC } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

export const ForbiddenPage: VFC = () => {
  const { t } = useTranslation();

  return (
    <Page>
      {t('У Вас нет доступа к этой странице')}
    </Page>
  );
};
