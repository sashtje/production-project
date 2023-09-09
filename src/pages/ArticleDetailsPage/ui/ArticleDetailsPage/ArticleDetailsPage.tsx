import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames';
import { Text } from 'shared/ui/Text';
import { Button } from 'shared/ui';
import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/addCommentForm';
import { AppRoutes, RoutePath } from 'shared/config/routerConfig/routerConfig';
import { Page } from 'widgets/Page';

import {
  fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import {
  // getArticleCommentsError,
  getArticleCommentsIsLoading,
} from '../../model/selectors/comments/comments';
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducersList: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};

export const ArticleDetailsPage = memo((props: ArticleDetailsPageProps) => {
  const { className } = props;

  const { t } = useTranslation('articles');
  const { id } = useParams<{id: string}>();
  const dispatch = useAppDispatch();
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  // const error = useSelector(getArticleCommentsError);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  }, [id]);

  const onSendComment = useCallback((textComment: string) => {
    dispatch(addCommentForArticle(textComment));
  }, [dispatch]);

  const navigate = useNavigate();
  const onBackToList = useCallback(() => {
    navigate(RoutePath[AppRoutes.ARTICLES]);
  }, [navigate]);

  if (!id) {
    return (
      <Page className={classNames(cls.articleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </Page>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducersList} removeAfterUnmount>
      <Page className={classNames(cls.articleDetailsPage, {}, [className])}>
        <Button onClick={onBackToList}>{t('Назад к списку')}</Button>

        <ArticleDetails id={id} />

        <Text
          title={t('Комментарии')}
          className={cls.commentTitle}
        />

        <AddCommentForm onSendComment={onSendComment} />

        <CommentList
          isLoading={commentsIsLoading}
          comments={comments}
        />
      </Page>
    </DynamicModuleLoader>
  );
});

ArticleDetailsPage.displayName = 'ArticleDetailsPage';