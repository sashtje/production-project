import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { UiDesignSwitcher } from './UiDesignSwitcher';

export default {
  title: 'shared/UiDesignSwitcher',
  component: UiDesignSwitcher,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof UiDesignSwitcher>;

const Template: ComponentStory<typeof UiDesignSwitcher> = (args) => <UiDesignSwitcher {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
