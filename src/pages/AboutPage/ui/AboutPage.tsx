import { VFC } from 'react';
import { useTranslation } from 'react-i18next';

export const AboutPage: VFC = () => {
  const { t } = useTranslation('about');

  return (
    <div>
      {t('О сайте')}
    </div>
  );
};
