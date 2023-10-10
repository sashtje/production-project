import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames';
import AppSvg from '@/shared/assets/icons/app-image.svg';

import { HStack } from '../../../deprecated/Stack';
import cls from './AppLogo.module.scss';

interface AppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo = memo((props: AppLogoProps) => {
  const { className, size = 50 } = props;

  return (
    <HStack className={classNames(cls.appLogoWrapper, {}, [className])} max justify="center">
      <div className={cls.gradientBig} />
      <div className={cls.gradientSmall} />
      <AppSvg className={cls.appLogo} width={size} height={size} color="#000" />
    </HStack>
  );
});

AppLogo.displayName = 'AppLogo';
