import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { AdditionalInfoContainer } from './AdditionalInfoContainer';

export default {
  title: 'shared/AdditionalInfoContainer',
  component: AdditionalInfoContainer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AdditionalInfoContainer>;

const Template: ComponentStory<typeof AdditionalInfoContainer> = (args) => <AdditionalInfoContainer {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
