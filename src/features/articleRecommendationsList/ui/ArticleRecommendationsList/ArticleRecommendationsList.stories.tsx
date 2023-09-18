import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleRecommendationsList } from './ArticleRecommendationsList';

export default {
  title: 'shared/ArticleRecommendationsList',
  component: ArticleRecommendationsList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => <ArticleRecommendationsList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
