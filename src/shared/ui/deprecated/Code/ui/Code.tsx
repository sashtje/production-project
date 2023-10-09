import { memo, useCallback } from 'react';

import { classNames } from '@/shared/lib/classNames';
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg';

import { Button, ButtonTheme } from '../../Button';
import cls from './Code.module.scss';

interface CodeProps {
  className?: string;
  text: string;
}

/**
 * @deprecated
 */
export const Code = memo((props: CodeProps) => {
  const { className, text } = props;

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre className={classNames(cls.code, {}, [className])}>
      <Button className={cls.copyBtn} theme={ButtonTheme.CLEAR} onClick={onCopy}>
        <CopyIcon className={cls.copyIcon} />
      </Button>

      <code>{text}</code>
    </pre>
  );
});

Code.displayName = 'Code';
