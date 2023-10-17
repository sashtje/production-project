import { addDecorator } from '@storybook/react';

import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import { Theme } from '../../src/shared/const/theme';
import { StoreDecorator } from '../../src/shared/config/storybook/StoreDecorator/StoreDecorator';
import { FeaturesFlagsDecorator } from '../../src/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  themes: {
    default: 'light',
    list: [
      { name: 'light', class: Theme.LIGHT, color: '#fff' },
      { name: 'dark', class: Theme.DARK, color: '#090949' },
      { name: 'orange', class: Theme.ORANGE, color: '#9a1a0e' },
    ],
  },
};

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(
  StoreDecorator({
    user: { authData: { jsonSettings: {} } },
  }),
);
addDecorator(RouterDecorator);
addDecorator(SuspenseDecorator);
addDecorator(FeaturesFlagsDecorator({}));
