import { VFC } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

export const AdminPanelPage: VFC = () => {
  const { t } = useTranslation();

  return (
    // eslint-disable-next-line i18next/no-literal-string
    <Page data-testid="AdminPanelPage">
      AdminPanelPage
    </Page>
  );
};
