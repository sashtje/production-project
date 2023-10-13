import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { ToggleFeatures } from '@/shared/lib/features';

import { NotificationItem } from '../../ui/NotificationItem/NotificationItem';
import { useNotifications } from '../../api/notificationApi';

interface NotificationsListProps {
  className?: string;
}

export const NotificationsList = memo((props: NotificationsListProps) => {
  const { className } = props;
  const { data, isLoading } = useNotifications(null, {
    pollingInterval: 10000,
  });

  if (isLoading) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <VStack gap="16" max className={classNames('', {}, [className])}>
            <Skeleton width="100%" borderRadius="8px" height={80} />
            <Skeleton width="100%" borderRadius="8px" height={80} />
            <Skeleton width="100%" borderRadius="8px" height={80} />
          </VStack>
        }
        off={
          <VStack gap="16" max className={classNames('', {}, [className])}>
            <SkeletonDeprecated width="100%" borderRadius="8px" height={80} />
            <SkeletonDeprecated width="100%" borderRadius="8px" height={80} />
            <SkeletonDeprecated width="100%" borderRadius="8px" height={80} />
          </VStack>
        }
      />
    );
  }

  return (
    <VStack gap="16" max className={classNames('', {}, [className])}>
      {data?.map((notification) => (
        <NotificationItem key={notification.id} item={notification} />
      ))}
    </VStack>
  );
});

NotificationsList.displayName = 'NotificationsList';
