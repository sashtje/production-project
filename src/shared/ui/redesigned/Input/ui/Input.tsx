import { InputHTMLAttributes, memo, ReactNode, useEffect, useRef, useState } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames';

import { HStack } from '../../Stack';
import { Text } from '../../Text';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly' | 'size'
>;

type InputSize = 's' | 'm' | 'l';

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  readonly?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  label?: string;
  size?: InputSize;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autofocus,
    readonly,
    addonLeft,
    addonRight,
    label,
    size = 'm',
    ...otherProps
  } = props;

  const ref = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (autofocus) {
      ref.current?.focus();
    }
  }, [autofocus]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const mods: Mods = {
    [cls.readonly]: readonly,
    [cls.focused]: isFocused,
    [cls.withAddonLeft]: Boolean(addonLeft),
    [cls.withAddonRight]: Boolean(addonRight),
  };

  const input = (
    <div className={classNames(cls.inputWrapper, mods, [className, cls[size]])}>
      {!!addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}

      <input
        ref={ref}
        type={type}
        value={value}
        onChange={changeHandler}
        onFocus={onFocus}
        onBlur={onBlur}
        className={cls.input}
        readOnly={readonly}
        placeholder={placeholder}
        {...otherProps}
      />

      {!!addonRight && <div className={cls.addonRight}>{addonRight}</div>}
    </div>
  );

  if (label) {
    return (
      <HStack max gap="8">
        <Text text={label} />

        {input}
      </HStack>
    );
  }

  return input;
});

Input.displayName = 'Input';
