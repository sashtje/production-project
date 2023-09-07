import { VFC } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'widgets/Page';

export const MainPage: VFC = () => {
  const { t } = useTranslation('main');

  return (
    <Page>
      {t('Главная страница')}
    </Page>
  );
};
