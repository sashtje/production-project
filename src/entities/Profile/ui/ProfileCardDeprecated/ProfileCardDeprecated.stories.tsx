import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Country } from '@/entities/Country/testing';
import { Currency } from '@/entities/Currency/testing';

import { ProfileCardDeprecated } from './ProfileCardDeprecated';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCardDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCardDeprecated>;

const Template: ComponentStory<typeof ProfileCardDeprecated> = (args) => (
  <ProfileCardDeprecated {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
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

export const WithError = Template.bind({});
WithError.args = {
  error: 'true',
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
