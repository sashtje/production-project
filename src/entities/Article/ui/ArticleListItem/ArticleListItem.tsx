import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames';
import { Text } from 'shared/ui/Text';
import { Card } from 'shared/ui/Card';
import { Avatar } from 'shared/ui/Avatar';
import { Button } from 'shared/ui/Button';
import { Icon } from 'shared/ui/Icon';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { AppRoutes, RoutePath } from 'shared/config/routerConfig/routerConfig';

import {
  Article, ArticleBlockType, ArticleTextBlock, ArticleView,
} from '../../model/types/article';
import cls from './ArticleListItem.module.scss';
import { ArticleTextBlockComponent } from '../../ui/ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const {
    className,
    article,
    view,
  } = props;

  const { t } = useTranslation('articles');

  const types = (
    <Text
      className={cls.types}
      text={article.type.join(', ')}
    />
  );
  const views = (
    <>
      <Text
        className={cls.views}
        text={String(article.views)}
      />
      <Icon Svg={EyeIcon} />
    </>
  );

  const navigate = useNavigate();
  const onOpenArticle = useCallback(() => {
    navigate(RoutePath[AppRoutes.ARTICLE_DETAILS] + article.id);
  }, [article.id, navigate]);

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;

    return (
      <div className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar
              size={30}
              src={article.user.avatar}
              alt={article.user.username}
            />
            <Text
              text={article.user.username}
              className={cls.username}
            />
            <Text
              text={article.createdAt}
              className={cls.date}
            />
          </div>

          <Text title={article.title} className={cls.title} />
          {types}
          <img src={article.img} alt={article.title} className={cls.img} />
          {!!textBlock && (
            <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
          )}

          <div className={cls.footer}>
            <Button onClick={onOpenArticle}>
              {t('Читать далее')}
            </Button>

            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={classNames(cls.articleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.card} onClick={onOpenArticle}>
        <div className={cls.imageWrapper}>
          <img
            className={cls.img}
            src={article.img}
            alt={article.title}
          />

          <Text
            className={cls.date}
            text={article.createdAt}
          />
        </div>

        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>

        <Text
          className={cls.title}
          text={article.title}
        />
      </Card>
    </div>
  );
});

ArticleListItem.displayName = 'ArticleListItem';
