import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';

import { CommentItem } from './CommentItem';

export default {
  title: 'entities/Comment/CommentItem',
  component: CommentItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentItem>;

const Template: ComponentStory<typeof CommentItem> = (args) => <CommentItem {...args} />;

const normalArgs = {
  comment: {
    id: '1',
    text: 'hello world',
    user: { id: '1', username: 'Don' },
  },
};

export const Normal = Template.bind({});
Normal.args = normalArgs;

export const Loading = Template.bind({});
Loading.args = {
  ...normalArgs,
  isLoading: true,
};

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = normalArgs;
NormalRedesigned.decorators = [FeaturesFlagsDecorator({ isAppRedesigned: true })];

export const LoadingRedesigned = Template.bind({});
LoadingRedesigned.args = {
  ...normalArgs,
  isLoading: true,
};
LoadingRedesigned.decorators = [FeaturesFlagsDecorator({ isAppRedesigned: true })];
