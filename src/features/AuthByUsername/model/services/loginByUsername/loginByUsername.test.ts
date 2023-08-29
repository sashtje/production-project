import { userActions } from 'entities/User';

import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/TestAsyncThunk';
import { loginByUsername } from './loginByUsername';

describe('loginByUsername.test', () => {
  test('success login', async () => {
    const userValue = { username: 'testUser', id: '1' };

    const thunk = new TestAsyncThunk(loginByUsername);
    thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));
    const result = await thunk.callThunk({ username: userValue.username, password: '123' });

    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toStrictEqual('fulfilled');
    expect(result.payload).toStrictEqual(userValue);
  });

  test('error login', async () => {
    const thunk = new TestAsyncThunk(loginByUsername);
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk({ username: 'Sara', password: '123' });

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toStrictEqual('rejected');
    expect(result.payload).toStrictEqual('error');
  });
});
