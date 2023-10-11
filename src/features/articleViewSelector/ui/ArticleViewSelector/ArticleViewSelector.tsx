import { memo } from 'react';

import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { ArticleView } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import ViewSmallIconDeprecated from '@/shared/assets/icons/view-small.svg';
import ViewBigIconDeprecated from '@/shared/assets/icons/view-big.svg';
import ViewSmallIcon from '@/shared/assets/icons/tile.svg';
import ViewBigIcon from '@/shared/assets/icons/burger.svg';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';

import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => ViewSmallIcon,
      off: () => ViewSmallIconDeprecated,
    }),
  },
  {
    view: ArticleView.BIG,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => ViewBigIcon,
      off: () => ViewBigIconDeprecated,
    }),
  },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props;

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card
          borderRadius="round"
          className={classNames(cls.articleViewSelectorRedesigned, {}, [className])}
        >
          <HStack gap="8">
            {viewTypes.map((viewType) => (
              <Icon
                key={viewType.view}
                className={classNames('', { [cls.notSelected]: viewType.view !== view }, [])}
                Svg={viewType.icon}
                clickable
                onClick={onClick(viewType.view)}
              />
            ))}
          </HStack>
        </Card>
      }
      off={
        <div className={classNames(cls.articleViewSelector, {}, [className])}>
          {viewTypes.map((viewType) => (
            <ButtonDeprecated
              key={viewType.view}
              theme={ButtonTheme.CLEAR}
              onClick={onClick(viewType.view)}
            >
              <IconDeprecated
                className={classNames('', { [cls.notSelected]: viewType.view !== view }, [])}
                Svg={viewType.icon}
                width={24}
                height={24}
              />
            </ButtonDeprecated>
          ))}
        </div>
      }
    />
  );
});

ArticleViewSelector.displayName = 'ArticleViewSelector';
