import { getQueryParams } from './addQueryParams';

describe('getQueryParams.test', () => {
  test('test with one param', () => {
    const params = getQueryParams({
      test: 'value',
    });

    expect(params).toBe('?test=value');
  });

  test('test with multiple params', () => {
    const params = getQueryParams({
      test: 'value',
      search: 'apple',
    });

    expect(params).toBe('?test=value&search=apple');
  });

  test('test with undefined', () => {
    const params = getQueryParams({
      test: 'value',
      search: undefined,
    });

    expect(params).toBe('?test=value');
  });
});
