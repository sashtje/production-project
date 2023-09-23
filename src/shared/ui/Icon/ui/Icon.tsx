import { memo, VFC, SVGProps } from 'react';

import { classNames } from '@/shared/lib/classNames';

import cls from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement>{
  className?: string;
  Svg: VFC<SVGProps<SVGSVGElement>>;
  inverted?: boolean;
}

export const Icon = memo((props: IconProps) => {
  const {
    className,
    Svg,
    inverted,
    ...otherProps
  } = props;

  return (
    <Svg
      className={classNames(cls.icon, { [cls.inverted]: inverted }, [className])}
      {...otherProps}
    />
  );
});

Icon.displayName = 'Icon';
