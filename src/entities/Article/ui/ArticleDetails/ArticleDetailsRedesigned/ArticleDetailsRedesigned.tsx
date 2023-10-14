import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { AppImage } from '@/shared/ui/redesigned/AppImage';

import { ArticleBlockType } from '../../../model/consts/consts';
import { ArticleImageBlockComponent } from '../../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleCodeBlockComponent } from '../../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleBlock } from '../../../model/types/article';
import { fetchArticleById } from '../../../model/services/fetchArticleById/fetchArticleById';
import {
  getArticleDetails,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../../model/selectors/getArticleDetails/getArticleDetails';
import cls from './ArticleDetailsRedesigned.module.scss';
import { articleDetailsReducer } from '../../../model/slice/articleDetailsSlice';

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetailsRedesigned = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;

  const { t } = useTranslation('articles');
  const dispatch = useAppDispatch();
  const article = useSelector(getArticleDetails);
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.TEXT:
        return <ArticleTextBlockComponent key={block.id} block={block} className={cls.block} />;
      case ArticleBlockType.CODE:
        return <ArticleCodeBlockComponent key={block.id} block={block} className={cls.block} />;
      case ArticleBlockType.IMAGE:
        return <ArticleImageBlockComponent key={block.id} block={block} className={cls.block} />;
      default:
        return null;
    }
  }, []);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = (
      <>
        <Skeleton className={cls.avatar} width={200} height={200} borderRadius="50%" />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
      </>
    );
  } else if (error) {
    content = <Text title={t('Произошла ошибка при загрузке статьи')} align="center" />;
  } else {
    content = (
      <>
        <Text title={article?.title} size="l" bold />
        <Text text={article?.subtitle} size="l" />

        <AppImage
          className={cls.img}
          src={article?.img}
          fallback={<Skeleton width="100%" height={420} borderRadius="16px" />}
        />

        {article?.blocks.map(renderBlock)}
      </>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <VStack gap="16" max className={classNames(cls.articleDetails, {}, [className])}>
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});

ArticleDetailsRedesigned.displayName = 'ArticleDetailsRedesigned';
