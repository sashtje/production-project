import { VFC } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'shared/ui/Page';

export const AboutPage: VFC = () => {
  const { t } = useTranslation('about');

  return (
    <Page>
      {t('О сайте')}
    </Page>
  );
};
