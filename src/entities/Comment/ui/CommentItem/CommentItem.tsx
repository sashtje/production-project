import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames';
import { Avatar } from 'shared/ui/Avatar';
import { Text } from 'shared/ui/Text';
import { Skeleton } from 'shared/ui/Skeleton';

import cls from './CommentItem.module.scss';
import { Comment } from '../../model/types/comment';

interface CommentItemProps {
  className?: string;
  comment: Comment;
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
      <div className={classNames(cls.commentItem, {}, [className])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} borderRadius="50%" />
          <Skeleton width={100} height={16} className={cls.username} />
        </div>
        <Skeleton width="100%" height={50} className={cls.text} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.commentItem, {}, [className])}>
      <div className={cls.header}>
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
      </div>
      <Text
        text={comment.text}
        className={cls.text}
      />
    </div>
  );
});

CommentItem.displayName = 'CommentItem';
