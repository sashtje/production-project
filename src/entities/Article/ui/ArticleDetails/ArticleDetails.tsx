import { memo } from 'react';

import { ToggleFeatures } from '@/shared/lib/features';
import { ArticleDetailsRedesigned } from '@/entities/Article/ui/ArticleDetails/ArticleDetailsRedesigned/ArticleDetailsRedesigned';
import { ArticleDetailsDeprecated } from '@/entities/Article/ui/ArticleDetails/ArticleDetailsDeprecated/ArticleDetailsDeprecated';

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<ArticleDetailsRedesigned id={id} className={className} />}
      off={<ArticleDetailsDeprecated id={id} className={className} />}
    />
  );
});

ArticleDetails.displayName = 'ArticleDetails';
