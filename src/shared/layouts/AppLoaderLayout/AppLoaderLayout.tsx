import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

import { MainLayout } from '../MainLayout/MainLayout';
import cls from './AppLoaderLayout.module.scss';

interface AppLoaderLayoutProps {
  className?: string;
}

export const AppLoaderLayout = memo((props: AppLoaderLayoutProps) => {
  const { className } = props;

  return (
    <MainLayout
      className={classNames(cls.appLoaderLayout, {}, [className])}
      header={
        <HStack className={cls.header}>
          <Skeleton width={40} height={40} borderRadius="50%" />
        </HStack>
      }
      content={
        <VStack gap="16" className={cls.content}>
          <Skeleton width="70%" height={32} borderRadius="16px" />
          <Skeleton width="40%" height={20} borderRadius="16px" />
          <Skeleton width="50%" height={20} borderRadius="16px" />
          <Skeleton width="30%" height={32} borderRadius="16px" />
          <Skeleton width="80%" height="40%" borderRadius="16px" />
          <Skeleton width="80%" height="40%" borderRadius="16px" />
        </VStack>
      }
      sidebar={<Skeleton width={220} height="100%" borderRadius="32px" />}
    />
  );
});

AppLoaderLayout.displayName = 'AppLoaderLayout';
