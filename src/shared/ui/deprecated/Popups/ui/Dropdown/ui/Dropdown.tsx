import { Fragment, memo, ReactNode } from 'react';
import { Menu } from '@headlessui/react';

import { classNames } from '@/shared/lib/classNames';
import { DropdownDirection } from '@/shared/types/ui';

import { AppLink } from '../../../../AppLink';
import cls from './Dropdown.module.scss';
import commonCls from '../../../styles/popup.module.scss';

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

/**
 * @deprecated
 */
export const Dropdown = memo((props: DropdownProps) => {
  const { className, items, trigger, direction = 'bottom-left' } = props;

  return (
    <Menu as="div" className={classNames(commonCls.popup, {}, [className])}>
      <Menu.Button className={commonCls.trigger}>{trigger}</Menu.Button>

      <Menu.Items className={classNames(cls.menu, {}, [commonCls[direction]])}>
        {items.map((item) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              type="button"
              disabled={item.disabled}
              className={classNames(cls.item, { [commonCls.active]: active }, [])}
              onClick={item.onClick}
            >
              {item.content}
            </button>
          );

          if (item.href) {
            return (
              <Menu.Item
                key={String(item.content)}
                as={AppLink}
                to={item.href}
                disabled={item.disabled}
              >
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
