import { DecoratorFn } from '@storybook/react';

import { Theme, ThemeProvider } from 'app/providers/ThemeProvider';

export const ThemeDecorator = (theme: Theme): DecoratorFn => (StoryComponent) => {
  document.body.className = theme;

  return (
    <ThemeProvider initialTheme={theme}>
      <div className="app">
        <StoryComponent />
      </div>
    </ThemeProvider>
  );
};
