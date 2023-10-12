import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleView } from '../../../model/consts/consts';
import { article } from '../../../mocks/data';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned';

export default {
  title: 'entities/Article/redesigned/ArticleListItemRedesigned',
  component: ArticleListItemRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleListItemRedesigned>;

const Template: ComponentStory<typeof ArticleListItemRedesigned> = (args) => (
  <ArticleListItemRedesigned {...args} />
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
