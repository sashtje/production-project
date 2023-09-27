import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { Skeleton } from '@/shared/ui/Skeleton';
import { AppLink } from '@/shared/ui/AppLink';
import { VStack } from '@/shared/ui/Stack';
import { AppRoutes, RoutePath } from '@/shared/const/router';

import cls from './CommentItem.module.scss';
import { Comment } from '../../model/types/comment';

interface CommentItemProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentItem = memo((props: CommentItemProps) => {
  const {
    className,
    comment,
    isLoading,
  } = props;

  const { t } = useTranslation();

  if (isLoading) {
    return (
      <VStack gap="8" max className={classNames(cls.commentItem, {}, [className, cls.loading])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} borderRadius="50%" />
          <Skeleton width={100} height={16} className={cls.username} />
        </div>
        <Skeleton width="100%" height={50} className={cls.text} />
      </VStack>
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <VStack gap="8" max className={classNames(cls.commentItem, {}, [className])}>
      <AppLink className={cls.header} to={`${RoutePath[AppRoutes.PROFILE]}${comment.user.id}`}>
        {comment.user.avatar ? (
          <Avatar
            size={30}
            src={comment.user.avatar}
            alt={t('Аватар')}
          />
        ) : null}
        <Text
          title={comment.user.username}
          className={cls.username}
        />
      </AppLink>
      <Text
        text={comment.text}
      />
    </VStack>
  );
});

CommentItem.displayName = 'CommentItem';
