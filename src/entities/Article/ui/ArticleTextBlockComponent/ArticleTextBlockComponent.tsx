import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ToggleFeatures } from '@/shared/lib/features';

import cls from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
  const { className, block } = props;

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <div className={classNames(cls.articleTextBlockComponent, {}, [className])}>
          {block.title && <Text title={block.title} className={cls.title} />}
          {block.paragraphs.map((paragraph) => (
            <Text key={paragraph} text={paragraph} className={cls.paragraph} />
          ))}
        </div>
      }
      off={
        <div className={classNames(cls.articleTextBlockComponent, {}, [className])}>
          {block.title && <TextDeprecated title={block.title} className={cls.title} />}
          {block.paragraphs.map((paragraph) => (
            <TextDeprecated key={paragraph} text={paragraph} className={cls.paragraph} />
          ))}
        </div>
      }
    />
  );
});

ArticleTextBlockComponent.displayName = 'ArticleTextBlockComponent';
