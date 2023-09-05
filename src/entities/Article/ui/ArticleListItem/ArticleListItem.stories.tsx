import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { article } from 'entities/Article/mocks/data';
import { ArticleView } from 'entities/Article';
import { ArticleListItem } from './ArticleListItem';

export default {
  title: 'entities/Article/ArticleListItem',
  component: ArticleListItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleListItem>;

const Template: ComponentStory<typeof ArticleListItem> = (args) => <ArticleListItem {...args} />;

export const NormalSmall = Template.bind({});
NormalSmall.args = {
  article,
  view: ArticleView.SMALL,
};

export const NormalBig = Template.bind({});
NormalBig.args = {
  article,
  view: ArticleView.BIG,
};
