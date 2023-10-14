import { memo, useCallback } from 'react';

import { classNames } from '@/shared/lib/classNames';
import CopyIcon from '@/shared/assets/icons/copy.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

import cls from './Code.module.scss';

interface CodeProps {
  className?: string;
  text: string;
}

export const Code = memo((props: CodeProps) => {
  const { className, text } = props;

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre className={classNames(cls.code, {}, [className])}>
      <Icon clickable onClick={onCopy} className={cls.copyBtn} Svg={CopyIcon} />

      <code>{text}</code>
    </pre>
  );
});

Code.displayName = 'Code';
