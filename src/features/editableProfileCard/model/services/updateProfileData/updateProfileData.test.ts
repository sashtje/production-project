import { TestAsyncThunk } from '@/shared/lib/tests/testAsyncThunk/TestAsyncThunk';
import { Country } from '@/entities/Country/testing';
import { Currency } from '@/entities/Currency/testing';

import { ValidateProfileError } from '../../consts/consts';
import { updateProfileData } from './updateProfileData';

const form = {
  id: '1',
  username: 'admin',
  age: 22,
  country: Country.Armenia,
  first: 'John',
  lastname: 'Black',
  currency: Currency.EUR,
  city: 'Munich',
};

describe('updateProfileData.test', () => {
  test('success update profile', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form,
      },
    });
    thunk.api.put.mockReturnValue(Promise.resolve({ data: form }));

    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toStrictEqual('fulfilled');
    expect(result.payload).toStrictEqual(form);
  });

  test('error update profile', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form,
      },
    });
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toStrictEqual('rejected');
    expect(result.payload).toStrictEqual([ValidateProfileError.SERVER_ERROR]);
  });

  test('validate error', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: { ...form, lastname: '' },
      },
    });

    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toStrictEqual('rejected');
    expect(result.payload).toStrictEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });
});
