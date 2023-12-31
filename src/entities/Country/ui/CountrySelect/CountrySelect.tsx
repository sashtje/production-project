import { useCallback, useMemo, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { AppRoutes } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';

import { Country } from '../../model/types/country';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

export const CountrySelect = memo((props: CountrySelectProps) => {
  const { className, value, onChange, readonly } = props;

  const { t } = useTranslation(AppRoutes.PROFILE);

  const countryOptions = useMemo(
    () =>
      Object.entries(Country).map((val) => ({
        value: val[0],
        content: val[1],
      })),
    [],
  );

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Country);
    },
    [onChange],
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <ListBox
          className={classNames('', {}, [className])}
          defaultValue={t('Страна')}
          label={t('Страна')}
          value={value}
          items={countryOptions}
          onChange={onChangeHandler}
          readonly={readonly}
          direction="top-right"
        />
      }
      off={
        <ListBoxDeprecated
          className={classNames('', {}, [className])}
          defaultValue={t('Страна')}
          label={t('Страна')}
          value={value}
          items={countryOptions}
          onChange={onChangeHandler}
          readonly={readonly}
          direction="top-right"
        />
      }
    />
  );
});

CountrySelect.displayName = 'CountrySelect';
