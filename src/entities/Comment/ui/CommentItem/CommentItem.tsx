import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { getRouteProfile } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';

import cls from './CommentItem.module.scss';
import { Comment } from '../../model/types/comment';

interface CommentItemProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentItem = memo((props: CommentItemProps) => {
  const { className, comment, isLoading } = props;

  const { t } = useTranslation();

  if (isLoading) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <VStack gap="8" max className={classNames(cls.commentItem, {}, [className, cls.loading])}>
            <div className={cls.header}>
              <Skeleton width={30} height={30} borderRadius="50%" />
              <Skeleton width={100} height={16} className={cls.username} />
            </div>
            <Skeleton width="100%" height={50} className={cls.text} />
          </VStack>
        }
        off={
          <VStack gap="8" max className={classNames(cls.commentItem, {}, [className, cls.loading])}>
            <div className={cls.header}>
              <SkeletonDeprecated width={30} height={30} borderRadius="50%" />
              <SkeletonDeprecated width={100} height={16} className={cls.username} />
            </div>
            <SkeletonDeprecated width="100%" height={50} className={cls.text} />
          </VStack>
        }
      />
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card padding="24" borderRadius="round" fullwidth>
          <VStack
            data-testid="CommentItem.Content"
            gap="8"
            max
            className={classNames(cls.commentItemRedesigned, {}, [className])}
          >
            <AppLink to={getRouteProfile(comment.user.id)}>
              <HStack gap="8">
                {comment.user.avatar ? (
                  <Avatar size={30} src={comment.user.avatar} alt={t('Аватар')} />
                ) : null}
                <Text text={comment.user.username} bold />
              </HStack>
            </AppLink>
            <Text text={comment.text} />
          </VStack>
        </Card>
      }
      off={
        <VStack
          data-testid="CommentItem.Content"
          gap="8"
          max
          className={classNames(cls.commentItem, {}, [className])}
        >
          <AppLinkDeprecated className={cls.header} to={getRouteProfile(comment.user.id)}>
            {comment.user.avatar ? (
              <AvatarDeprecated size={30} src={comment.user.avatar} alt={t('Аватар')} />
            ) : null}
            <TextDeprecated title={comment.user.username} className={cls.username} />
          </AppLinkDeprecated>
          <TextDeprecated text={comment.text} />
        </VStack>
      }
    />
  );
});

CommentItem.displayName = 'CommentItem';
