import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { AppRoutes } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';

import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { getProfileData, getProfileReadonly } from '../../model/selectors';

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader = memo((props: EditableProfileCardHeaderProps) => {
  const { className } = props;
  const { t } = useTranslation(AppRoutes.PROFILE);

  const readonly = useSelector(getProfileReadonly);
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);

  const canEdit = authData?.id === profileData?.id;

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card borderRadius="partial" padding="24" fullwidth>
          <HStack className={classNames('', {}, [className])} justify="between" max>
            <Text title={t('Профиль')} />

            {canEdit &&
              (readonly ? (
                <Button onClick={onEdit} data-testid="EditableProfileCardHeader.EditButton">
                  {t('Редактировать')}
                </Button>
              ) : (
                <HStack gap="8">
                  <Button
                    onClick={onCancelEdit}
                    color="error"
                    data-testid="EditableProfileCardHeader.CancelButton"
                  >
                    {t('Отменить')}
                  </Button>

                  <Button
                    onClick={onSave}
                    color="success"
                    data-testid="EditableProfileCardHeader.SaveButton"
                  >
                    {t('Сохранить')}
                  </Button>
                </HStack>
              ))}
          </HStack>
        </Card>
      }
      off={
        <HStack className={classNames('', {}, [className])} justify="between" max>
          <TextDeprecated title={t('Профиль')} />

          {canEdit &&
            (readonly ? (
              <ButtonDeprecated
                theme={ButtonTheme.OUTLINE}
                onClick={onEdit}
                data-testid="EditableProfileCardHeader.EditButton"
              >
                {t('Редактировать')}
              </ButtonDeprecated>
            ) : (
              <HStack gap="8">
                <ButtonDeprecated
                  theme={ButtonTheme.OUTLINE_RED}
                  onClick={onCancelEdit}
                  data-testid="EditableProfileCardHeader.CancelButton"
                >
                  {t('Отменить')}
                </ButtonDeprecated>

                <ButtonDeprecated
                  theme={ButtonTheme.OUTLINE}
                  onClick={onSave}
                  data-testid="EditableProfileCardHeader.SaveButton"
                >
                  {t('Сохранить')}
                </ButtonDeprecated>
              </HStack>
            ))}
        </HStack>
      }
    />
  );
});

EditableProfileCardHeader.displayName = 'EditableProfileCardHeader';
