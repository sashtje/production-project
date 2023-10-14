import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { ArticleDetailsRedesigned } from './ArticleDetailsRedesigned';
import { article } from '../../../mocks/data';

export default {
  title: 'entities/Article/ArticleDetailsRedesigned',
  component: ArticleDetailsRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleDetailsRedesigned>;

const Template: ComponentStory<typeof ArticleDetailsRedesigned> = (args) => (
  <ArticleDetailsRedesigned {...args} />
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
