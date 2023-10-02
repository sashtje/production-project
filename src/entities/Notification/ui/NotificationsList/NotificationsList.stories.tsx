import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { NotificationsList } from './NotificationsList';

export default {
  title: 'entities/Notification/NotificationsList',
  component: NotificationsList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NotificationsList>;

const Template: ComponentStory<typeof NotificationsList> = (args) => <NotificationsList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
  mockData: [
    {
      url: `${__API__}/notifications`,
      method: 'GET',
      status: 200,
      response: [
        {
          id: '1',
          title: 'Notification 1',
          description: 'Description 1',
        },
        {
          id: '2',
          title: 'Notification 2',
          description: 'Description 2',
        },
        {
          id: '3',
          title: 'Notification 3',
          description: 'Description 3',
        },
      ],
    },
  ],
};
