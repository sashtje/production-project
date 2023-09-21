import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames';

import { Portal } from '../../Portal';
import { Overlay } from '../../Overlay';
import cls from './Drawer.module.scss';

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Drawer = (props: DrawerProps) => {
  const {
    className,
    children,
    isOpen,
    onClose,
  } = props;
  const { t } = useTranslation();

  return (
    <Portal>
      <div className={classNames(cls.drawer, { [cls.opened]: isOpen }, [className])}>
        <Overlay onClick={onClose} />

        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  );
};
