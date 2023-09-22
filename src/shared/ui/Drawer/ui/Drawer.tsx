import { ReactNode } from 'react';

import { classNames, Mods } from 'shared/lib/classNames';

import { useModal } from 'shared/lib/hooks/useModal/useModal';
import { Portal } from '../../Portal';
import { Overlay } from '../../Overlay';
import cls from './Drawer.module.scss';

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Drawer = (props: DrawerProps) => {
  const {
    className,
    children,
    isOpen,
    onClose,
    lazy,
  } = props;

  const { isClosing, isMounted, close } = useModal({ isOpen, onClose, animationDelay: ANIMATION_DELAY });

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(cls.drawer, mods, [className])}>
        <Overlay onClick={close} />

        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  );
};
