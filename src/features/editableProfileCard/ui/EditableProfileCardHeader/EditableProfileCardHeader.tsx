import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames';

import { AppRoutes } from 'shared/config/routerConfig/routerConfig';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from 'entities/User';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text';
import { Button } from 'shared/ui';
import { ButtonTheme } from 'shared/ui/Button';

import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import {
  getProfileData, getProfileReadonly,
} from '../../model/selectors';

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
    <HStack
      className={classNames('', {}, [className])}
      justify="between"
      max
    >
      <Text title={t('Профиль')} />

      {canEdit && (
        readonly
          ? (
            <Button
              theme={ButtonTheme.OUTLINE}
              onClick={onEdit}
            >
              {t('Редактировать')}
            </Button>
          )
          : (
            <HStack gap="8">
              <Button
                theme={ButtonTheme.OUTLINE_RED}
                onClick={onCancelEdit}
              >
                {t('Отменить')}
              </Button>

              <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onSave}
              >
                {t('Сохранить')}
              </Button>
            </HStack>
          )
      )}
    </HStack>
  );
});

EditableProfileCardHeader.displayName = 'EditableProfileCardHeader';
