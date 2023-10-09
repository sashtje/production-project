import { HTMLAttributes, memo, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames';

import cls from './Card.module.scss';

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
  fullwidth?: boolean;
}

/**
 * @deprecated
 */
export const Card = memo((props: CardProps) => {
  const { className, children, theme = CardTheme.NORMAL, fullwidth = false, ...otherProps } = props;

  return (
    <div
      className={classNames(cls.card, { [cls.fullwidth]: fullwidth }, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
