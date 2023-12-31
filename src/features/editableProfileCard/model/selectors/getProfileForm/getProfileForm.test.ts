import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country/testing';
import { Currency } from '@/entities/Currency/testing';

import { getProfileForm } from './getProfileForm';

describe('getProfileForm.test', () => {
  test('should return profile form', () => {
    const data = {
      username: 'admin',
      age: 22,
      country: Country.Armenia,
      first: 'John',
      lastname: 'Black',
      currency: Currency.EUR,
      city: 'Munich',
    };

    const state: DeepPartial<StateSchema> = {
      profile: {
        form: data,
      },
    };

    expect(getProfileForm(state as StateSchema)).toStrictEqual(data);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getProfileForm(state as StateSchema)).toStrictEqual(undefined);
  });
});
