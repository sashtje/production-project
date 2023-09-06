import { VFC } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'shared/ui/Page';

export const MainPage: VFC = () => {
  const { t } = useTranslation('main');

  return (
    <Page>
      {t('Главная страница')}
    </Page>
  );
};
