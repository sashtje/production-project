import { DecoratorFn } from '@storybook/react';
import { DeepPartial } from '@reduxjs/toolkit';

import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
): DecoratorFn => (StoryComponent) => (
  <StoreProvider initialState={state}>
    <StoryComponent />
  </StoreProvider>
);
