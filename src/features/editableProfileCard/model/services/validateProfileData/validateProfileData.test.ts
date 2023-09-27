import { Country } from '@/entities/Country/testing';
import { Currency } from '@/entities/Currency/testing';

import { ValidateProfileError } from '../../consts/consts';
import { validateProfileData } from './validateProfileData';

const data = {
  first: 'John',
  lastname: 'Black',
  age: 22,
  username: 'admin',
  country: Country.Armenia,
  city: 'Munich',
  currency: Currency.EUR,
};

describe('validateProfileData.test', () => {
  test('valid data', () => {
    const result = validateProfileData(data);

    expect(result).toStrictEqual([]);
  });

  test('without first and last names', () => {
    const result = validateProfileData({ ...data, first: '', lastname: '' });

    expect(result).toStrictEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });

  test('incorrect age', () => {
    const result = validateProfileData({ ...data, age: 3.5 });

    expect(result).toStrictEqual([ValidateProfileError.INCORRECT_AGE]);
  });

  test('incorrect country', () => {
    const result = validateProfileData({ ...data, country: undefined });

    expect(result).toStrictEqual([ValidateProfileError.INCORRECT_COUNTRY]);
  });

  test('incorrect all', () => {
    const result = validateProfileData({
      ...data, first: undefined, age: undefined, country: undefined,
    });

    expect(result).toStrictEqual([ValidateProfileError.INCORRECT_USER_DATA, ValidateProfileError.INCORRECT_AGE, ValidateProfileError.INCORRECT_COUNTRY]);
  });

  test('no data', () => {
    const result = validateProfileData();

    expect(result).toStrictEqual([ValidateProfileError.NO_DATA]);
  });
});
