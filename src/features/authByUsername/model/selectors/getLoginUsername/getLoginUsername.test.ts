import { StateSchema } from '@/app/providers/StoreProvider';

import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername.test', () => {
  test('should return username', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        username: 'Sara',
      },
    };

    expect(getLoginUsername(state as StateSchema)).toStrictEqual('Sara');
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getLoginUsername(state as StateSchema)).toStrictEqual('');
  });
});
