import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { User } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { getCanEditArticle } from '@/pages/ArticleDetailsPage/model/selectors/article';

interface ArticalAdditionalInfoProps {
  className?: string;
  author: User;
  createdAt: string;
  views: number;
  onEdit: () => void;
}

export const ArticalAdditionalInfo = memo((props: ArticalAdditionalInfoProps) => {
  const { className, author, views, createdAt, onEdit } = props;
  const canEditArticle = useSelector(getCanEditArticle);

  const { t } = useTranslation('articles');

  return (
    <VStack gap="32" className={className}>
      <HStack gap="8">
        <Avatar src={author.avatar} size={32} />

        <Text text={author.username} bold />

        <Text text={createdAt} />
      </HStack>

      {canEditArticle && <Button onClick={onEdit}>{t('Редактировать')}</Button>}

      <Text text={t('Просмотров', { count: views })} />
    </VStack>
  );
});

ArticalAdditionalInfo.displayName = 'ArticalAdditionalInfo';
