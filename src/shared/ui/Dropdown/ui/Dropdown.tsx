import { Fragment, memo, ReactNode } from 'react';
import { Menu } from '@headlessui/react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames';
import { DropdownDirection } from 'shared/types/ui';

import { AppLink } from '../../AppLink';
import cls from './Dropdown.module.scss';

interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  trigger: ReactNode;
  direction?: DropdownDirection;
}

export const Dropdown = memo((props: DropdownProps) => {
  const {
    className,
    items,
    trigger,
    direction = 'bottom-left',
  } = props;

  const { t } = useTranslation();

  return (
    <Menu as="div" className={classNames(cls.dropdown, {}, [className])}>
      <Menu.Button className={cls.btn}>
        {trigger}
      </Menu.Button>

      <Menu.Items className={classNames(cls.menu, {}, [cls[direction]])}>
        {items.map((item) => {
          const content = ({ active }: {active: boolean}) => (
            <button
              type="button"
              disabled={item.disabled}
              className={classNames(cls.item, { [cls.active]: active }, [])}
              onClick={item.onClick}
            >
              {item.content}
            </button>
          );

          if (item.href) {
            return (
              <Menu.Item key={String(item.content)} as={AppLink} to={item.href} disabled={item.disabled}>
                {content}
              </Menu.Item>
            );
          }

          return (
            <Menu.Item key={String(item.content)} as={Fragment} disabled={item.disabled}>
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
});

Dropdown.displayName = 'Dropdown';
