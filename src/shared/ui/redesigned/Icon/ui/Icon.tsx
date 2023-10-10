import { memo, FC, SVGProps } from 'react';

import { classNames } from '@/shared/lib/classNames';

import cls from './Icon.module.scss';

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
  className?: string;
  Svg: FC<SVGProps<SVGSVGElement>>;
}

interface NotClickableIconProps extends IconBaseProps {
  clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
  clickable: true;
  onClick: () => void;
}

type IconProps = NotClickableIconProps | ClickableIconProps;

export const Icon = memo((props: IconProps) => {
  const { className, Svg, width = 32, height = 32, clickable, ...otherProps } = props;

  const icon = (
    <Svg
      className={classNames(cls.icon, {}, [className])}
      width={width}
      height={height}
      {...otherProps}
      onClick={undefined}
    />
  );

  if (clickable) {
    return (
      <button type="button" onClick={props.onClick} className={cls.button}>
        {icon}
      </button>
    );
  }

  return icon;
});

Icon.displayName = 'Icon';
