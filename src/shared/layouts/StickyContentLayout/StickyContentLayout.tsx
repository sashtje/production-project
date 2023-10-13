import { memo, ReactElement } from 'react';

import { classNames } from '@/shared/lib/classNames';

import cls from './StickyContentLayout.module.scss';

interface StickyContentLayoutProps {
  className?: string;
  left?: ReactElement;
  content: ReactElement;
  right?: ReactElement;
}

export const StickyContentLayout = memo((props: StickyContentLayoutProps) => {
  const { className, left, content, right } = props;

  return (
    <div className={classNames(cls.stickyContentLayout, {}, [className])}>
      {left && <div className={cls.left}>{left}</div>}

      <div className={cls.content}>{content}</div>

      {right && <div className={cls.right}>{right}</div>}
    </div>
  );
});

StickyContentLayout.displayName = 'StickyContentLayout';
