import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames';
import { Code as CodeDeprecated } from '@/shared/ui/deprecated/Code';
import { Code } from '@/shared/ui/redesigned/Code';
import { ToggleFeatures } from '@/shared/lib/features';

import { ArticleCodeBlock } from '../../model/types/article';
import cls from './ArticleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps) => {
  const { className, block } = props;

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <div className={classNames(cls.articleCodeBlockComponent, {}, [className])}>
          <Code text={block.code} />
        </div>
      }
      off={
        <div className={classNames(cls.articleCodeBlockComponent, {}, [className])}>
          <CodeDeprecated text={block.code} />
        </div>
      }
    />
  );
});

ArticleCodeBlockComponent.displayName = 'ArticleCodeBlockComponent';
