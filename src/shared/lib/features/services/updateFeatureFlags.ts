import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { updateFeatureFlagsMutation } from '@/shared/lib/features/api/featureFlagsApi';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { getAllFeatureFlags, setFeatureFlags } from '@/shared/lib/features/lib/setGetFeatures';

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

  const allFeatures = {
    ...getAllFeatureFlags(),
    ...newFeatures,
  };

  try {
    await dispatch(
      updateFeatureFlagsMutation({
        userId,
        features: allFeatures,
      }),
    );

    setFeatureFlags(allFeatures);

    return undefined;
  } catch (e) {
    console.log(e);
    return rejectWithValue('');
  }
});
