import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginIsLoading } from './getLoginIsLoading';

describe('getLoginIsLoading.test', () => {
  test('should return isLoading', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        isLoading: true,
      },
    };

    expect(getLoginIsLoading(state as StateSchema)).toStrictEqual(true);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getLoginIsLoading(state as StateSchema)).toStrictEqual(false);
  });
});
