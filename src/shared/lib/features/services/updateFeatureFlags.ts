import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { updateFeatureFlagsMutation } from '@/shared/lib/features/api/featureFlagsApi';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { getAllFeatureFlags } from '@/shared/lib/features/lib/setGetFeatures';

interface UpdateFeatureFlagsArg {
  userId: string;
  newFeatures: Partial<FeatureFlags>;
}

export const updateFeatureFlags = createAsyncThunk<
  void,
  UpdateFeatureFlagsArg,
  ThunkConfig<string>
>('features/updateFeatureFlags', async ({ userId, newFeatures }, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;

  try {
    await dispatch(
      updateFeatureFlagsMutation({
        userId,
        features: {
          ...getAllFeatureFlags(),
          ...newFeatures,
        },
      }),
    );

    window.location.reload();

    return undefined;
  } catch (e) {
    console.log(e);
    return rejectWithValue('');
  }
});
