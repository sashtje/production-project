import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { AppLink } from './AppLink';

export default {
  title: 'shared/redesigned/AppLink',
  component: AppLink,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: 'https://google.com',
  },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Test',
  variant: 'primary',
};

export const Red = Template.bind({});
Red.args = {
  children: 'Test',
  variant: 'red',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  children: 'Test',
  variant: 'primary',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const RedDark = Template.bind({});
RedDark.args = {
  children: 'Test',
  variant: 'red',
};
RedDark.decorators = [ThemeDecorator(Theme.DARK)];
