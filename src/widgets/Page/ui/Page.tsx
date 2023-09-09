import {
  memo, MutableRefObject, ReactNode, useRef, UIEvent,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUIScrollByPath, uiActions } from 'features/UI';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { StateSchema } from 'app/providers/StoreProvider';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';

import cls from './Page.module.scss';

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
  const {
    className,
    children,
    onScrollEnd,
  } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const scrollPosition = useSelector((state: StateSchema) => getUIScrollByPath(state, pathname));

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(uiActions.setScrollPosition({
      path: pathname,
      position: e.currentTarget.scrollTop,
    }));
  }, 500);

  useInfiniteScroll({
    callback: onScrollEnd,
    wrapperRef,
    triggerRef,
  });

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  }, [scrollPosition]);

  return (
    <section
      ref={wrapperRef}
      className={classNames(cls.page, {}, [className])}
      onScroll={onScroll}
    >
      {children}

      {!!onScrollEnd && <div className={cls.trigger} ref={triggerRef} />}
    </section>
  );
});

Page.displayName = 'Page';
