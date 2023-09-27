import { DecoratorFn } from '@storybook/react';

// eslint-disable-next-line fsd-checker/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Theme } from '@/shared/const/theme';

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
