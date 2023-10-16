import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { EditableProfileCard } from '@/features/editableProfileCard';
import { AppRoutes } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';

interface ProfilePageProps {
  className?: string;
}

export const ProfilePage = (props: ProfilePageProps) => {
  const { className } = props;
  const { t } = useTranslation(AppRoutes.PROFILE);
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<Text text={t('Профиль не найден')} />}
        off={<TextDeprecated text={t('Профиль не найден')} />}
      />
    );
  }

  return (
    <Page data-testid="ProfilePage" className={classNames('', {}, [className])}>
      <VStack gap="16" max>
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
};
