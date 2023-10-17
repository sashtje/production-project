import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Country } from '@/entities/Country/testing';
import { Currency } from '@/entities/Currency/testing';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { ProfileCard } from './ProfileCard';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

const profileArgs = {
  data: {
    username: 'admin',
    age: 22,
    country: Country.Armenia,
    first: 'John',
    lastname: 'Black',
    currency: Currency.EUR,
    city: 'Munich',
    avatar: 'https://s10.stc.yc.kpcdn.net/share/i/12/12010775/wr-960.webp',
  },
};

export const Primary = Template.bind({});
Primary.args = profileArgs;

export const WithError = Template.bind({});
WithError.args = {
  error: 'true',
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = profileArgs;
PrimaryRedesigned.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK)];

export const WithErrorRedesigned = Template.bind({});
WithErrorRedesigned.args = {
  error: 'true',
};
WithErrorRedesigned.decorators = [FeaturesFlagsDecorator({ isAppRedesigned: true })];

export const LoadingRedesigned = Template.bind({});
LoadingRedesigned.args = {
  isLoading: true,
};
LoadingRedesigned.decorators = [FeaturesFlagsDecorator({ isAppRedesigned: true })];
