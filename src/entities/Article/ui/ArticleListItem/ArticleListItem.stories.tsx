import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleView } from '../../model/consts/consts';
import { article } from '../../mocks/data';
import { ArticleListItem } from './ArticleListItem';

export default {
  title: 'entities/Article/ArticleListItem',
  component: ArticleListItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleListItem>;

const Template: ComponentStory<typeof ArticleListItem> = (args) => (
  <ArticleListItem {...args} />
);

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
