import { memo, useState } from 'react';

import { classNames } from '@/shared/lib/classNames';
import StarIcon from '@/shared/assets/icons/star-20-20.svg';
import { ToggleFeatures } from '@/shared/lib/features';

import cls from './StarRating.module.scss';
import { Icon as IconDeprecated } from '../../../deprecated/Icon';
import { Icon } from '../../Icon';

interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
  const { className, onSelect, size = 30, selectedStars = 0 } = props;

  const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(starsCount);
    }
  };

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarsCount(0);
    }
  };

  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount);
      setCurrentStarsCount(starsCount);
      setIsSelected(true);
    }
  };

  return (
    <div className={classNames(cls.starRating, {}, [className])}>
      {stars.map((starNumber) => (
        <ToggleFeatures
          feature="isAppRedesigned"
          on={
            <Icon
              clickable={!isSelected}
              Svg={StarIcon}
              key={starNumber}
              className={classNames(
                cls.starIcon,
                {
                  [cls.hoveredRedesigned]: currentStarsCount >= starNumber,
                  [cls.selected]: isSelected,
                },
                [cls.normal],
              )}
              width={size}
              height={size}
              onMouseLeave={onLeave}
              onMouseEnter={onHover(starNumber)}
              onClick={onClick(starNumber)}
              data-testid={`StarRating.${starNumber}`}
              data-selected={currentStarsCount >= starNumber}
            />
          }
          off={
            <IconDeprecated
              Svg={StarIcon}
              key={starNumber}
              className={classNames(
                cls.starIcon,
                {
                  [cls.hovered]: currentStarsCount >= starNumber,
                  [cls.selected]: isSelected,
                },
                [cls.normal],
              )}
              width={size}
              height={size}
              onMouseLeave={onLeave}
              onMouseEnter={onHover(starNumber)}
              onClick={onClick(starNumber)}
              data-testid={`StarRating.${starNumber}`}
              data-selected={currentStarsCount >= starNumber}
            />
          }
        />
      ))}
    </div>
  );
});

StarRating.displayName = 'StarRating';
