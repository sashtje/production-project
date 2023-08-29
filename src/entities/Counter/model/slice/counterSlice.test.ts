import { CounterSchema } from '../types/counterSchema';
import { counterReducer, counterActions } from './counterSlice';

describe('counterSlice.test', () => {
  test('should decrement counter value', () => {
    const state: CounterSchema = { value: 10 };

    expect(
      counterReducer(state, counterActions.decrement()),
    ).toStrictEqual({ value: 9 });
  });

  test('should increment counter value', () => {
    const state: CounterSchema = { value: 10 };

    expect(
      counterReducer(state, counterActions.increment()),
    ).toStrictEqual({ value: 11 });
  });

  test('should work with empty state', () => {
    expect(
      counterReducer(undefined, counterActions.increment()),
    ).toStrictEqual({ value: 1 });
  });
});
