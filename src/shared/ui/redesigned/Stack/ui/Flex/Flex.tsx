import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames';

import cls from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexWrap = 'nowrap' | 'wrap';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '24' | '32';

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends DivProps {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction: FlexDirection;
  wrap?: FlexWrap;
  gap?: FlexGap;
  max?: boolean;
}

export const Flex = (props: FlexProps) => {
  const {
    className,
    children,
    justify = 'start',
    align = 'center',
    direction,
    gap,
    max,
    wrap = 'nowrap',
    ...otherProps
  } = props;

  return (
    <div
      className={classNames(cls.flex, { [cls.max]: max }, [
        cls[`justify-${justify}`],
        cls[`align-${align}`],
        cls[`direction-${direction}`],
        gap && cls[`gap-${gap}`],
        className,
        cls[wrap],
      ])}
      {...otherProps}
    >
      {children}
    </div>
  );
};
