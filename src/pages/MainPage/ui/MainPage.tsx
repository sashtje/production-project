import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

export const MainPage = () => {
  const { t } = useTranslation('main');

  return (
    <Page data-testid="MainPage">
      {t('Главная страница')}
    </Page>
  );
};
