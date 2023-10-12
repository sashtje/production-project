import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleView } from '../../../model/consts/consts';
import { article } from '../../../mocks/data';
import { ArticleListItemDeprecated } from './ArticleListItemDeprecated';

export default {
  title: 'entities/Article/ArticleListItemDeprecated',
  component: ArticleListItemDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleListItemDeprecated>;

const Template: ComponentStory<typeof ArticleListItemDeprecated> = (args) => (
  <ArticleListItemDeprecated {...args} />
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
