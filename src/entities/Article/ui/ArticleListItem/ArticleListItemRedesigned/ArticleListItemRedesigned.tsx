import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteArticlesDetails } from '@/shared/const/router';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import { ArticleBlockType, ArticleView } from '../../../model/consts/consts';
import { Article, ArticleTextBlock } from '../../../model/types/article';
import cls from './ArticleListItemRedesigned.module.scss';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;

  const { t } = useTranslation('articles');

  const views = (
    <HStack gap="8">
      <Icon Svg={EyeIcon} />
      <Text className={cls.views} text={String(article.views)} />
    </HStack>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
      <Card
        padding="24"
        fullwidth
        className={classNames(cls.articleListItem, {}, [className, cls[view]])}
        data-testid="ArticleListItemRedesigned"
      >
        <VStack max gap="16">
          <HStack max gap="8">
            <Avatar size={30} src={article.user.avatar} alt={article.user.username} />
            <Text bold text={article.user.username} />
            <Text text={article.createdAt} />
          </HStack>

          <Text title={article.title} bold />
          <Text title={article.subtitle} size="s" />
          <AppImage
            fallback={<Skeleton width="100%" height={250} />}
            src={article.img}
            alt={article.title}
            className={cls.img}
          />
          {!!textBlock?.paragraphs && (
            <Text text={textBlock.paragraphs.slice(0, 2).join('\n')} className={cls.textBlock} />
          )}

          <HStack max justify="between">
            <AppLink target={target} to={getRouteArticlesDetails(article.id)}>
              <Button>{t('Читать далее')}</Button>
            </AppLink>

            {views}
          </HStack>
        </VStack>
      </Card>
    );
  }

  return (
    <AppLink
      data-testid="ArticleListItemRedesigned"
      target={target}
      to={getRouteArticlesDetails(article.id)}
      className={classNames(cls.articleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <AppImage
            fallback={<Skeleton width={200} height={200} />}
            className={cls.img}
            src={article.img}
            alt={article.title}
          />

          <Text text={article.createdAt} />
        </div>

        <div className={cls.infoWrapper}>
          {/* {types} */}
          {views}
        </div>

        <Text className={cls.title} text={article.title} />
      </Card>
    </AppLink>
  );
});

ArticleListItemRedesigned.displayName = 'ArticleListItemRedesigned';
