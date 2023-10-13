import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

import { classNames } from '@/shared/lib/classNames';
import { NotificationsList } from '@/entities/Notification';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { Popover } from '@/shared/ui/redesigned/Popups';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Icon } from '@/shared/ui/redesigned/Icon';
import NotificationIconDeprecated from '@/shared/assets/icons/notifications-20-20.svg';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { ToggleFeatures } from '@/shared/lib/features';

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
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />}
      off={
        <ButtonDeprecated onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
          <IconDeprecated Svg={NotificationIconDeprecated} inverted />
        </ButtonDeprecated>
      }
    />
  );

  return (
    <div>
      <BrowserView>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={
            <Popover
              className={classNames(cls.notificationButton, {}, [className])}
              trigger={trigger}
              direction="bottom-right"
            >
              <NotificationsList className={cls.notifications} />
            </Popover>
          }
          off={
            <PopoverDeprecated
              className={classNames(cls.notificationButton, {}, [className])}
              trigger={trigger}
              direction="bottom-right"
            >
              <NotificationsList className={cls.notifications} />
            </PopoverDeprecated>
          }
        />
      </BrowserView>

      <MobileView>
        {trigger}

        <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
          <NotificationsList />
        </Drawer>
      </MobileView>
    </div>
  );
});

NotificationButton.displayName = 'NotificationButton';
