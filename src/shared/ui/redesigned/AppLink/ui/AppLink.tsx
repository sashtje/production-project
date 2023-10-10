import { ForwardedRef, forwardRef, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames';

import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
  className?: string;
  variant?: AppLinkVariant;
  children?: ReactNode;
}

export const AppLink = forwardRef((props: AppLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { to, className, children, variant = 'primary', ...otherProps } = props;

  return (
    <Link
      to={to}
      ref={ref}
      className={classNames(cls.appLink, {}, [className, cls[variant]])}
      {...otherProps}
    >
      {children}
    </Link>
  );
});
