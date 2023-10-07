import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { setFeatureFlags } from '@/shared/lib/features';

import { saveJsonSettings } from '../services/saveJsonSettings';
import { User, UserSchema } from '../types/user';
import { JsonSettings } from '../types/jsonSettings';

const initialState: UserSchema = {
  _inited: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
      setFeatureFlags(action.payload.features);
    },
    initAuthData: (state) => {
      const userData = localStorage.getItem(USER_LOCALSTORAGE_KEY);

      if (userData) {
        const user = JSON.parse(userData) as User;
        state.authData = user;
        setFeatureFlags(user.features);
      }
      state._inited = true;
    },
    logout: (state) => {
      state.authData = undefined;

      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      saveJsonSettings.fulfilled,
      (state, { payload }: PayloadAction<JsonSettings>) => {
        if (state.authData) {
          state.authData.jsonSettings = payload;
        }
      },
    );
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
