import { Fragment, ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Listbox as HListBox } from '@headlessui/react';

import { classNames } from '@/shared/lib/classNames';
import { DropdownDirection } from '@/shared/types/ui';

import { HStack } from '../../../../../redesigned/Stack';
import { Button } from '../../../../Button';
import cls from './ListBox.module.scss';
import commonCls from '../../../styles/popup.module.scss';

export interface ListBoxItem<T extends string> {
  value: T;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps<T extends string> {
  className?: string;
  items?: ListBoxItem<T>[];
  value?: T;
  defaultValue?: string;
  onChange: (value: T) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

export const ListBox = <T extends string>(props: ListBoxProps<T>) => {
  const {
    className,
    items,
    value,
    defaultValue,
    readonly,
    direction = 'bottom-left',
    label,
    onChange,
  } = props;
  const { t } = useTranslation();

  const selectedItem = useMemo(() => items?.find((item) => item.value === value), [items, value]);

  return (
    <HStack gap="4">
      {label && <span>{`${label}>`}</span>}

      <HListBox
        disabled={readonly}
        as="div"
        className={classNames(commonCls.popup, {}, [className])}
        value={value}
        onChange={onChange}
      >
        <HListBox.Button as="div" className={commonCls.trigger}>
          <Button variant="filled" disabled={readonly}>
            {selectedItem?.content ?? defaultValue}
          </Button>
        </HListBox.Button>

        <HListBox.Options
          className={classNames(cls.options, {}, [commonCls[direction], commonCls.menu])}
        >
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(
                    cls.item,
                    {
                      [commonCls.active]: active,
                      [commonCls.disabled]: item.disabled,
                      [commonCls.selected]: selected,
                    },
                    [],
                  )}
                >
                  {selected}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
};
