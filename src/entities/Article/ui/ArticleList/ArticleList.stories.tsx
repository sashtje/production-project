import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleView } from '../../model/consts/consts';
import { article } from '../../mocks/data';
import { ArticleList } from './ArticleList';

export default {
  title: 'entities/Article/ArticleList',
  component: ArticleList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleList>;

const Template: ComponentStory<typeof ArticleList> = (args) => (
  <ArticleList {...args} />
);

export const NormalSmall = Template.bind({});
NormalSmall.args = {
  articles: [{ ...article }, { ...article, id: '2' }, { ...article, id: '3' }],
};

export const NormalBig = Template.bind({});
NormalBig.args = {
  articles: [{ ...article }, { ...article, id: '2' }, { ...article, id: '3' }],
  view: ArticleView.BIG,
};

export const LoadingSmall = Template.bind({});
LoadingSmall.args = {
  articles: [],
  isLoading: true,
};

export const LoadingBig = Template.bind({});
LoadingBig.args = {
  articles: [],
  isLoading: true,
  view: ArticleView.BIG,
};
