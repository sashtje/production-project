import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { UserRole } from '@/entities/User/testing';

import { ArticlePageGreeting } from './ArticlePageGreeting';

export default {
  title: 'features/ArticlePageGreeting',
  component: ArticlePageGreeting,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlePageGreeting>;

const Template: ComponentStory<typeof ArticlePageGreeting> = () => <ArticlePageGreeting />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: '1',
        roles: [UserRole.ADMIN],
        jsonSettings: { isArticlesPageWasOpened: false },
      },
    },
  }),
];
Normal.parameters = {
  mockData: [
    {
      url: `${__API__}/users/1`,
      method: 'PATCH',
      status: 200,
      response: [],
    },
  ],
};
