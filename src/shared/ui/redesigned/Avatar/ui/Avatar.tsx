import { CSSProperties, useMemo } from 'react';

import { classNames } from '@/shared/lib/classNames';

import { Skeleton } from '../../Skeleton';
import { AppImage } from '../../../redesigned/AppImage';
import AvatarErrorFallback from '../../../../assets/icons/avatarErrorFallback.svg';
import cls from './Avatar.module.scss';
import { Icon } from '../../Icon';

interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
}

export const Avatar = (props: AvatarProps) => {
  const { className, src, alt, size = 100 } = props;

  const styles = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size],
  );

  const fallback = <Skeleton width={size} height={size} borderRadius="50%" />;
  const errorFallback = <Icon width={size} height={size} Svg={AvatarErrorFallback} />;

  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.avatar, {}, [className])}
    />
  );
};
