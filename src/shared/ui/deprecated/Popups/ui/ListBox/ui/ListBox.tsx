import { Fragment, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Listbox as HListBox } from '@headlessui/react';

import { classNames } from '@/shared/lib/classNames';
import { DropdownDirection } from '@/shared/types/ui';

import { HStack } from '../../../../../redesigned/Stack';
import { Button } from '../../../../Button';
import cls from './ListBox.module.scss';
import commonCls from '../../../styles/popup.module.scss';

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps {
  className?: string;
  items?: ListBoxItem[];
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

/**
 * @deprecated
 */
export const ListBox = (props: ListBoxProps) => {
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
          <Button disabled={readonly}>{value ?? defaultValue}</Button>
        </HListBox.Button>

        <HListBox.Options className={classNames(cls.options, {}, [commonCls[direction]])}>
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
                    },
                    [],
                  )}
                >
                  {selected && '!!!'}
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
