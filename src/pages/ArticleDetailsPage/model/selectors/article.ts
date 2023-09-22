import { createSelector } from '@reduxjs/toolkit';

import { getArticleDetails } from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';

export const getCanEditArticle = createSelector(
  getArticleDetails,
  getUserAuthData,
  (article, user) => {
    if (!article || !user) {
      return false;
    }

    return article.userId === user.id;
  },
);
