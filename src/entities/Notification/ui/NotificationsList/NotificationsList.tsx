import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';

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
      <VStack gap="16" max className={classNames('', {}, [className])}>
        <Skeleton width="100%" borderRadius="8px" height={80} />
        <Skeleton width="100%" borderRadius="8px" height={80} />
        <Skeleton width="100%" borderRadius="8px" height={80} />
      </VStack>
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
