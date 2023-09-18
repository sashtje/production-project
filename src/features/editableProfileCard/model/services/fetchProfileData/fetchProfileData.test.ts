import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/TestAsyncThunk';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

import { fetchProfileData } from './fetchProfileData';

const data = {
  username: 'admin',
  age: 22,
  country: Country.Armenia,
  first: 'John',
  lastname: 'Black',
  currency: Currency.EUR,
  city: 'Munich',
};

describe('fetchProfileData.test', () => {
  test('success fetch', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));

    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toStrictEqual('fulfilled');
    expect(result.payload).toStrictEqual(data);
  });

  test('error fetch', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk('1');

    expect(result.meta.requestStatus).toStrictEqual('rejected');
  });
});
