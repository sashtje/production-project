import { classNames } from 'shared/lib/classNames';

import { Loader } from '../../Loader';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
  <div className={classNames(cls.pageLoader, {}, [className])}>
    <Loader />
  </div>
);
