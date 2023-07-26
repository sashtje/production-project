import { DecoratorFn } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator: DecoratorFn = (StoryComponent) => (
  <BrowserRouter>
    <StoryComponent />
  </BrowserRouter>
);
