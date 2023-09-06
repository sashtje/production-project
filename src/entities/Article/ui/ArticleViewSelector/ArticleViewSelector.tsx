import { memo } from 'react';

import { Button, ButtonTheme } from 'shared/ui/Button';
import { Icon } from 'shared/ui/Icon';
import { classNames } from 'shared/lib/classNames';
import ViewSmallIcon from 'shared/assets/icons/view-small.svg';
import ViewBigIcon from 'shared/assets/icons/view-big.svg';

import { ArticleView } from '../../model/types/article';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: ViewSmallIcon,
  },
  {
    view: ArticleView.BIG,
    icon: ViewBigIcon,
  },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const {
    className,
    view,
    onViewClick,
  } = props;

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };

  return (
    <div className={classNames(cls.articleViewSelector, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button
          key={viewType.view}
          theme={ButtonTheme.CLEAR}
          onClick={onClick(viewType.view)}
        >
          <Icon
            className={classNames('', { [cls.notSelected]: viewType.view !== view }, [])}
            Svg={viewType.icon}
          />
        </Button>
      ))}
    </div>
  );
});

ArticleViewSelector.displayName = 'ArticleViewSelector';
