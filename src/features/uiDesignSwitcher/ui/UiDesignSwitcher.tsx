import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ListBox } from '@/shared/ui/redesigned/Popups';
import { getFeatureFlag, updateFeatureFlags } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { useForceUpdate } from '@/shared/render/forceUpdate';

interface UiDesignSwitcherProps {
  className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
  const { className } = props;
  const { t } = useTranslation('settings');
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const [isLoading, setIsLoading] = useState(false);
  const forceUpdate = useForceUpdate();

  const isAppRedesigned = getFeatureFlag('isAppRedesigned');
  const items = useMemo(
    () => [
      {
        content: t('Новый'),
        value: 'new',
      },
      {
        content: t('Старый'),
        value: 'old',
      },
    ],
    [t],
  );

  const onDesignChange = useCallback(
    async (value: string) => {
      if (authData?.id) {
        setIsLoading(true);

        await dispatch(
          updateFeatureFlags({
            userId: authData.id,
            newFeatures: {
              isAppRedesigned: value === 'new',
            },
          }),
        ).unwrap();

        forceUpdate();

        setIsLoading(false);
      }
    },
    [authData?.id, dispatch, forceUpdate],
  );

  return (
    <HStack gap="8" max>
      <Text text={t('Вариант интерфейса')} />

      {isLoading ? (
        <Skeleton width={100} height={40} />
      ) : (
        <ListBox
          onChange={onDesignChange}
          value={isAppRedesigned ? 'new' : 'old'}
          items={items}
          className={className}
        />
      )}
    </HStack>
  );
});

UiDesignSwitcher.displayName = 'UiDesignSwitcher';
