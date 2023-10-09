import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/deprecated/Button';

import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slice/counterSlice';

export const Counter = () => {
  const counterValue = useCounterValue();

  const { t } = useTranslation();

  const { decrement, increment } = useCounterActions();

  const onIncrement = () => {
    increment();
  };

  const onDecrement = () => {
    decrement();
  };

  return (
    <div>
      <h1 data-testid="value-title">{counterValue}</h1>

      <Button onClick={onIncrement} data-testid="increment-btn">
        {t('increment')}
      </Button>

      <Button onClick={onDecrement} data-testid="decrement-btn">
        {t('decrement')}
      </Button>
    </div>
  );
};
