import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Card } from '@/shared/ui/redesigned/Card';
import { ToggleFeatures } from '@/shared/lib/features';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import { ArticleView } from '../../model/consts/consts';
import clsDeprecated from './ArticleListItemDeprecated/ArticleListItemDeprecated.module.scss';
import cls from './ArticleListItemRedesigned/ArticleListItemRedesigned.module.scss';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo((props: ArticleListItemSkeletonProps) => {
  const { className, view } = props;

  if (view === ArticleView.BIG) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <Card
            padding="24"
            fullwidth
            className={classNames(cls.articleListItem, {}, [className, cls[view]])}
          >
            <VStack max gap="16">
              <HStack max gap="8">
                <Skeleton borderRadius="50%" width={30} height={30} />
                <Skeleton width={150} height={16} />
                <Skeleton width={150} height={16} />
              </HStack>

              <Skeleton width={250} height={24} />
              <Skeleton width={250} height={24} />
              <Skeleton height={200} />

              <Skeleton width={200} height={36} />
            </VStack>
          </Card>
        }
        off={
          <div
            className={classNames(clsDeprecated.articleListItem, {}, [
              className,
              clsDeprecated[view],
            ])}
          >
            <CardDeprecated className={clsDeprecated.card}>
              <div className={clsDeprecated.header}>
                <SkeletonDeprecated borderRadius="50%" width={30} height={30} />
                <SkeletonDeprecated className={clsDeprecated.username} width={150} height={16} />
                <SkeletonDeprecated className={clsDeprecated.date} width={150} height={16} />
              </div>

              <SkeletonDeprecated className={clsDeprecated.title} width={250} height={24} />
              <SkeletonDeprecated className={clsDeprecated.img} height={200} />

              <div className={clsDeprecated.footer}>
                <SkeletonDeprecated width={200} height={36} />
              </div>
            </CardDeprecated>
          </div>
        }
      />
    );
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <div className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
          <Card className={cls.card}>
            <div className={cls.imageWrapper}>
              <Skeleton className={cls.img} width={200} height={200} />
            </div>

            <div className={cls.infoWrapper}>
              <Skeleton width={130} height={16} />
            </div>

            <Skeleton className={cls.title} width={150} height={16} />
          </Card>
        </div>
      }
      off={
        <div
          className={classNames(clsDeprecated.articleListItem, {}, [
            className,
            clsDeprecated[view],
          ])}
        >
          <CardDeprecated className={clsDeprecated.card}>
            <div className={clsDeprecated.imageWrapper}>
              <SkeletonDeprecated className={clsDeprecated.img} width={200} height={200} />
            </div>

            <div className={clsDeprecated.infoWrapper}>
              <SkeletonDeprecated width={130} height={16} />
            </div>

            <SkeletonDeprecated className={clsDeprecated.title} width={150} height={16} />
          </CardDeprecated>
        </div>
      }
    />
  );
});

ArticleListItemSkeleton.displayName = 'ArticleListItemSkeleton';
