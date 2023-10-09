import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames';
import AppSvg from '@/shared/assets/icons/app-image.svg';

import { HStack } from '../../Stack';
import cls from './AppLogo.module.scss';

interface AppLogoProps {
  className?: string;
}

export const AppLogo = memo((props: AppLogoProps) => {
  const { className } = props;

  return (
    <HStack className={classNames(cls.appLogoWrapper, {}, [className])} max justify="center">
      <div className={cls.gradientBig} />
      <div className={cls.gradientSmall} />
      <AppSvg className={cls.appLogo} />
    </HStack>
  );
});

AppLogo.displayName = 'AppLogo';
