import { HTMLAttributes, memo, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames';

import cls from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light';
export type CardPadding = '0' | '8' | '16' | '24';
export type CardBorder = 'round' | 'default';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  variant?: CardVariant;
  fullwidth?: boolean;
  fullheight?: boolean;
  padding?: CardPadding;
  borderRadius?: CardBorder;
}

export const mapPaddingToClass: Record<CardPadding, string> = {
  '0': 'gap_0',
  '8': 'gap_8',
  '16': 'gap_16',
  '24': 'gap_24',
};

export const Card = memo((props: CardProps) => {
  const {
    className,
    children,
    variant = 'normal',
    fullwidth = false,
    fullheight = false,
    padding = '8',
    borderRadius = 'default',
    ...otherProps
  } = props;

  const paddingClass = mapPaddingToClass[padding];

  return (
    <div
      className={classNames(
        cls.card,
        { [cls.fullwidth]: fullwidth, [cls.fullheight]: fullheight },
        [className, cls[variant], cls[paddingClass], cls[borderRadius]],
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
