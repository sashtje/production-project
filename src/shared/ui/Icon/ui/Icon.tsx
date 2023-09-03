import { memo, VFC, SVGProps } from 'react';

import { classNames } from 'shared/lib/classNames';

import cls from './Icon.module.scss';

interface IconProps {
  className?: string;
  Svg: VFC<SVGProps<SVGSVGElement>>;
}

export const Icon = memo((props: IconProps) => {
  const {
    className,
    Svg,
  } = props;

  return (
    <Svg className={classNames(cls.icon, {}, [className])} />
  );
});

Icon.displayName = 'Icon';
