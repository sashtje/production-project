import { memo } from 'react';

import { classNames } from 'shared/lib/classNames';
import { Button } from 'shared/ui';
import { ButtonTheme } from 'shared/ui/Button';
import { Icon } from 'shared/ui/Icon';
import NotificationIcon from 'shared/assets/icons/notifications-20-20.svg';
import { NotificationsList } from 'entities/Notification';
import { Popover } from 'shared/ui/Popups';

import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;

  return (
    <Popover
      className={classNames(cls.notificationButton, {}, [className])}
      trigger={(
        <Button theme={ButtonTheme.CLEAR}>
          <Icon Svg={NotificationIcon} inverted />
        </Button>
      )}
      direction="bottom-right"
    >
      <NotificationsList className={cls.notifications} />
    </Popover>
  );
});

NotificationButton.displayName = 'NotificationButton';
