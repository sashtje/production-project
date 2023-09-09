import { useMemo, ChangeEvent } from 'react';

import { classNames, Mods } from 'shared/lib/classNames';

import cls from './Select.module.scss';

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
  const {
    className,
    label,
    options,
    value,
    onChange,
    readonly,
  } = props;

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T);
  };

  const optionsList = useMemo(() => options?.map(({ value, content }) => (
    <option
      className={cls.option}
      value={value}
      key={value}
    >
      {content}
    </option>
  )), [options]);

  const mods: Mods = {};

  return (
    <div className={classNames(cls.wrapper, mods, [className])}>
      {label && <span className={cls.label}>{`${label}>`}</span>}

      <select
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
        disabled={readonly}
      >
        {optionsList}
      </select>
    </div>
  );
};

Select.displayName = 'Select';
