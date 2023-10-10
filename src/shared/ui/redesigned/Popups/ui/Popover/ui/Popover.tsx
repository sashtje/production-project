import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Popover as HPopover } from '@headlessui/react';

import { classNames } from '@/shared/lib/classNames';
import { DropdownDirection } from '@/shared/types/ui';

import cls from './Popover.module.scss';
import commonCls from '../../../styles/popup.module.scss';

interface PopoverProps {
  className?: string;
  trigger: ReactNode;
  direction?: DropdownDirection;
  children: ReactNode;
}

export const Popover = (props: PopoverProps) => {
  const { className, trigger, direction = 'bottom-left', children } = props;
  const { t } = useTranslation();

  return (
    <HPopover className={classNames(commonCls.popup, {}, [className])}>
      <HPopover.Button className={commonCls.trigger} as="div">
        {trigger}
      </HPopover.Button>

      <HPopover.Panel className={classNames(cls.panel, {}, [commonCls[direction], commonCls.menu])}>
        {children}
      </HPopover.Panel>
    </HPopover>
  );
};
