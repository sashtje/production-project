import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames';
import { Text, TextSize } from 'shared/ui/Text';
import { Button } from 'shared/ui';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/addCommentForm';
import { AppRoutes, RoutePath } from 'shared/config/routerConfig/routerConfig';
import { Page } from 'widgets/Page';

import { articleDetailsPageReducer } from '../../model/slices';
import {
  fetchArticleRecommendations,
} from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations/recommendations';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments/comments';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import {
  getArticleRecommendations,
} from '../../model/slices/articleDetailsRecommendationsSlice';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducersList: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

export const ArticleDetailsPage = memo((props: ArticleDetailsPageProps) => {
  const { className } = props;

  const { t } = useTranslation('articles');
  const { id } = useParams<{id: string}>();
  const dispatch = useAppDispatch();
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  // const error = useSelector(getArticleCommentsError);

  const recommendations = useSelector(getArticleRecommendations.selectAll);
  const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
    dispatch(fetchArticleRecommendations());
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
          size={TextSize.L}
          title={t('Рекомендуем')}
          className={cls.commentTitle}
        />
        <ArticleList
          className={cls.recommendations}
          articles={recommendations}
          isLoading={recommendationsIsLoading}
          target="_blank"
        />

        <Text
          size={TextSize.L}
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
