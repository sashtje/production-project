import { combineReducers } from '@reduxjs/toolkit';

import { articleDetailsCommentsReducer } from '../../model/slices/articleDetailsCommentsSlice';
import {
  articleDetailsRecommendationsReducer,
} from '../../model/slices/articleDetailsRecommendationsSlice';
import { ArticleDetailsPageSchema } from '../types';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
  comments: articleDetailsCommentsReducer,
  recommendations: articleDetailsRecommendationsReducer,
});
