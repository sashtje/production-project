import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { article } from '@/entities/Article/testing';

import { ArticalAdditionalInfo } from './ArticalAdditionalInfo';

export default {
  title: 'shared/ArticalAdditionalInfo',
  component: ArticalAdditionalInfo,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticalAdditionalInfo>;

const Template: ComponentStory<typeof ArticalAdditionalInfo> = (args) => (
  <ArticalAdditionalInfo {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  author: article.user,
  views: article.views,
  createdAt: article.createdAt,
};
