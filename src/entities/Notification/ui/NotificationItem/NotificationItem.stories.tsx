import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { NotificationItem } from './NotificationItem';

export default {
  title: 'entities/Notification/NotificationItem',
  component: NotificationItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => (
  <NotificationItem {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  item: {
    userId: '1',
    id: '1',
    title: 'Notification 1',
    description: 'Description 1',
  },
};
