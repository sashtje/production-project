import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames';

import cls from './Overlay.module.scss';

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

/**
 * @deprecated
 */
export const Overlay = memo((props: OverlayProps) => {
  const { className, onClick } = props;

  return <div onClick={onClick} className={classNames(cls.overlay, {}, [className])} />;
});

Overlay.displayName = 'Overlay';
