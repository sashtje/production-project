import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema, ValidateProfileError } from '../types/editableProfileCardSchema';
import { profileActions, profileReducer } from '../slice/profileSlice';

const form = {
  username: 'admin',
  age: 22,
  country: Country.Armenia,
  first: 'John',
  lastname: 'Black',
  currency: Currency.EUR,
  city: 'Munich',
};

describe('profileSlice.test', () => {
  test('test set readonly', () => {
    const state: DeepPartial<ProfileSchema> = {
      readonly: false,
    };

    expect(profileReducer(state as ProfileSchema, profileActions.setReadonly(true))).toStrictEqual({ readonly: true });
  });

  test('test set updateProfile', () => {
    const state: DeepPartial<ProfileSchema> = {
      data: {
        first: 'Sarah',
        lastname: 'James',
      },
    };

    expect(profileReducer(state as ProfileSchema, profileActions.updateProfile({ first: 'John', lastname: 'Dou' }))).toStrictEqual({
      data: {
        first: 'Sarah',
        lastname: 'James',
      },
      form: { first: 'John', lastname: 'Dou' },
    });
  });

  test('test set cancelEdit', () => {
    const state: DeepPartial<ProfileSchema> = {
      readonly: false,
      validateErrors: [ValidateProfileError.INCORRECT_USER_DATA, ValidateProfileError.INCORRECT_AGE],
    };

    expect(profileReducer(state as ProfileSchema, profileActions.cancelEdit())).toEqual({ readonly: true });
  });

  // test for extra reducer updateProfileData.pending
  test('test update service pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateErrors: [ValidateProfileError.INCORRECT_USER_DATA, ValidateProfileError.INCORRECT_AGE],
    };

    expect(profileReducer(state as ProfileSchema, updateProfileData.pending)).toEqual({ isLoading: true, validateErrors: undefined });
  });

  // test for extra reducer updateProfileData.fulfilled
  test('test update service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
      readonly: false,
      data: form,
      form,
    };

    expect(profileReducer(state as ProfileSchema, updateProfileData.fulfilled({ ...form, first: 'Ann' }, ''))).toEqual({
      isLoading: false,
      readonly: true,
      data: { ...form, first: 'Ann' },
      form: { ...form, first: 'Ann' },
    });
  });
});
