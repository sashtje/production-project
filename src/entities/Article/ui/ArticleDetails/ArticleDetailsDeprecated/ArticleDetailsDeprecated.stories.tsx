import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { ArticleDetailsDeprecated } from './ArticleDetailsDeprecated';
import { article } from '../../../mocks/data';

export default {
  title: 'entities/Article/ArticleDetailsDeprecated',
  component: ArticleDetailsDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleDetailsDeprecated>;

const Template: ComponentStory<typeof ArticleDetailsDeprecated> = (args) => (
  <ArticleDetailsDeprecated {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
  StoreDecorator({
    articleDetails: {
      data: article,
    },
  }),
];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [
  StoreDecorator({
    articleDetails: {
      isLoading: true,
    },
  }),
];

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [
  StoreDecorator({
    articleDetails: {
      error: 'Error',
    },
  }),
];
