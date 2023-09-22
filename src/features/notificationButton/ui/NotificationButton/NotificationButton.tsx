import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

import { classNames } from 'shared/lib/classNames';
import { NotificationsList } from 'entities/Notification';
import { Popover } from 'shared/ui/Popups';
import { Drawer } from 'shared/ui/Drawer';
import { Button } from 'shared/ui';
import { ButtonTheme } from 'shared/ui/Button';
import { Icon } from 'shared/ui/Icon';
import NotificationIcon from 'shared/assets/icons/notifications-20-20.svg';
import { AnimationProvider } from 'shared/lib/components/AnimationProvider';

import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const trigger = (
    <Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
      <Icon Svg={NotificationIcon} inverted />
    </Button>
  );

  return (
    <div>
      <BrowserView>
        <Popover
          className={classNames(cls.notificationButton, {}, [className])}
          trigger={trigger}
          direction="bottom-right"
        >
          <NotificationsList className={cls.notifications} />
        </Popover>
      </BrowserView>

      <MobileView>
        {trigger}

        <AnimationProvider>
          <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
            <NotificationsList />
          </Drawer>
        </AnimationProvider>
      </MobileView>
    </div>
  );
});

NotificationButton.displayName = 'NotificationButton';
