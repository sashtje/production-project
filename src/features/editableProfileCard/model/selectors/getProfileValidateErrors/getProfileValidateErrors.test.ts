import { StateSchema } from '@/app/providers/StoreProvider';

import { ValidateProfileError } from '../../consts/consts';
import { getProfileValidateErrors } from './getProfileValidateErrors';

describe('getProfileValidateErrors.test', () => {
  test('should return profile validation errors', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: [ValidateProfileError.INCORRECT_USER_DATA, ValidateProfileError.INCORRECT_COUNTRY],
      },
    };

    expect(getProfileValidateErrors(state as StateSchema)).toStrictEqual([ValidateProfileError.INCORRECT_USER_DATA, ValidateProfileError.INCORRECT_COUNTRY]);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getProfileValidateErrors(state as StateSchema)).toStrictEqual(undefined);
  });
});
