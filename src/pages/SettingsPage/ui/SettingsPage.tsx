import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { UiDesignSwitcher } from '@/features/uiDesignSwitcher';

interface SettingsPageProps {
  className?: string;
}

export const SettingsPage = memo((props: SettingsPageProps) => {
  const { className } = props;

  const { t } = useTranslation('settings');

  return (
    <Page className={className}>
      <VStack gap="16" max>
        <Text title={t('Настройки пользователя')} />

        <UiDesignSwitcher />
      </VStack>
    </Page>
  );
});

SettingsPage.displayName = 'SettingsPage';
