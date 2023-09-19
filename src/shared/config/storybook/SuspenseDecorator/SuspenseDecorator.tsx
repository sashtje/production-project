import { DecoratorFn } from '@storybook/react';
import { Suspense } from 'react';

export const SuspenseDecorator: DecoratorFn = (StoryComponent) => (
  <Suspense>
    <StoryComponent />
  </Suspense>
);
