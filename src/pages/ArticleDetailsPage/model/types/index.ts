import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';
import { ArticleDetailsRecommendationsSchema } from '../types/ArticleDetailsRecommendationsSchema';

export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsCommentsSchema;
  recommendations: ArticleDetailsRecommendationsSchema;
}
