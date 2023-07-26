import { VFC } from 'react';
import { useTranslation } from 'react-i18next';

export const MainPage: VFC = () => {
  const { t } = useTranslation('main');

  return (
    <div>
      {t('Главная страница')}
    </div>
  );
};
