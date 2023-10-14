import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames';
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ToggleFeatures } from '@/shared/lib/features';

import { ArticleImageBlock } from '../../model/types/article';
import cls from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
  const { className, block } = props;

  return (
    <div className={classNames(cls.articleImageBlockComponent, {}, [className])}>
      <img src={block.src} alt={block.title} className={cls.img} />

      {block.title && (
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<Text text={block.title} align="center" />}
          off={<TextDeprecated text={block.title} align={TextAlign.CENTER} />}
        />
      )}
    </div>
  );
});

ArticleImageBlockComponent.displayName = 'ArticleImageBlockComponent';
