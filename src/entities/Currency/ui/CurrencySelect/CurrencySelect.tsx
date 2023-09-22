import { useCallback, useMemo, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames';
import { AppRoutes } from '@/shared/config/routerConfig/routerConfig';
import { ListBox } from '@/shared/ui/Popups/ui/ListBox';

import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const {
    className,
    value,
    onChange,
    readonly,
  } = props;

  const { t } = useTranslation(AppRoutes.PROFILE);

  const currencyOptions = useMemo(
    () => Object.entries(Currency).map((val) => ({ value: val[0], content: val[1] })),
    [],
  );

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency);
  }, [onChange]);

  return (
    <ListBox
      className={classNames('', {}, [className])}
      defaultValue={t('Валюта')}
      label={t('Валюта')}
      value={value}
      items={currencyOptions}
      onChange={onChangeHandler}
      readonly={readonly}
      direction="top-right"
    />
  );
});

CurrencySelect.displayName = 'CurrencySelect';
