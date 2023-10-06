import { LoginSchema } from '../types/loginSchema';
import { loginActions, loginReducer } from '../slices/loginSlice';

describe('loginSlice.test', () => {
  test('test set username', () => {
    const state: DeepPartial<LoginSchema> = {
      username: 'Sara',
    };

    expect(loginReducer(state as LoginSchema, loginActions.setUsername('John'))).toStrictEqual({
      username: 'John',
    });
  });

  test('test set password', () => {
    const state: DeepPartial<LoginSchema> = {
      password: '123',
    };

    expect(loginReducer(state as LoginSchema, loginActions.setPassword('qwerty'))).toStrictEqual({
      password: 'qwerty',
    });
  });
});
