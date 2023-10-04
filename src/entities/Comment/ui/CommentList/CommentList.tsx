import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames';
import { Text } from '@/shared/ui/Text';
import { VStack } from '@/shared/ui/Stack';

import { Comment } from '../../model/types/comment';
import { CommentItem } from '../CommentItem/CommentItem';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
  const { className, comments, isLoading } = props;

  const { t } = useTranslation();

  if (isLoading) {
    return (
      <VStack gap="16" max className={classNames('', {}, [className])}>
        <CommentItem isLoading />
        <CommentItem isLoading />
        <CommentItem isLoading />
      </VStack>
    );
  }

  return (
    <VStack gap="16" max className={classNames('', {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            isLoading={isLoading}
          />
        ))
      ) : (
        <Text text={t('Комментарии отсутствуют')} />
      )}
    </VStack>
  );
});

CommentList.displayName = 'CommentList';
