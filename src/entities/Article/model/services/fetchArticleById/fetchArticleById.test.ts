import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/TestAsyncThunk';

import { fetchArticleById } from './fetchArticleById';

const data = {
  id: '1',
  title: 'subtitle',
};

describe('fetchArticleById.test', () => {
  test('success fetch', async () => {
    const thunk = new TestAsyncThunk(fetchArticleById);
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));

    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toStrictEqual('fulfilled');
    expect(result.payload).toStrictEqual(data);
  });

  test('error fetch', async () => {
    const thunk = new TestAsyncThunk(fetchArticleById);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk('1');

    expect(result.meta.requestStatus).toStrictEqual('rejected');
  });
});
