import { StateSchema } from '@/app/providers/StoreProvider';

import {
  getArticleDetails, getArticleDetailsIsLoading, getArticleDetailsError,
} from './getArticleDetails';

describe('getArticleDetails.test', () => {
  test('should return article details data', () => {
    const data = {
      id: '1',
      title: 'subtitle',
    };

    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        data,
      },
    };

    expect(getArticleDetails(state as StateSchema)).toStrictEqual(data);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getArticleDetails(state as StateSchema)).toStrictEqual(undefined);
  });
});

describe('getArticleDetailsIsLoading.test', () => {
  test('should return isLoading', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        isLoading: true,
      },
    };

    expect(getArticleDetailsIsLoading(state as StateSchema)).toStrictEqual(true);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getArticleDetailsIsLoading(state as StateSchema)).toStrictEqual(false);
  });
});

describe('getArticleDetailsError.test', () => {
  test('should return error', () => {
    const error = 'No data';
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        error,
      },
    };

    expect(getArticleDetailsError(state as StateSchema)).toStrictEqual(error);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getArticleDetailsError(state as StateSchema)).toStrictEqual(undefined);
  });
});
