import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ScrollIcon from '@/shared/assets/icons/circle-up.svg';

import cls from './ScrollToTopButton.module.scss';

interface ScrollToTopButtonProps {
  className?: string;
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
  const { className } = props;

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Icon
      Svg={ScrollIcon}
      width={32}
      height={32}
      onClick={onClick}
      clickable
      className={classNames(cls.scrollToTopButton, {}, [className])}
    />
  );
});

ScrollToTopButton.displayName = 'ScrollToTopButton';
