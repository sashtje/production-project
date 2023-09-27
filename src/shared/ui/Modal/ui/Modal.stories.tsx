import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { Modal } from './Modal';

export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore earum esse fuga impedit iure mollitia sint veniam. Excepturi, iure, voluptatem?',
  isOpen: true,
};

export const Dark = Template.bind({});
Dark.args = {
  children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore earum esse fuga impedit iure mollitia sint veniam. Excepturi, iure, voluptatem?',
  isOpen: true,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
