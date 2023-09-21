import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ListBox } from './ListBox';

export default {
  title: 'shared/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => <div style={{ margin: '300px' }}><Story /></div>,
  ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  defaultValue: 'Placeholder',
  label: 'Choose value',
  value: '1',
  items: [
    { value: '1', content: 'value 1' },
    { value: '2', content: 'value 2', disabled: true },
    { value: '3', content: 'value 3' },
    { value: '4', content: 'value 4' },
    { value: '5', content: 'value 5' },
  ],
  onChange: action('onChangeValue'),
};

export const DirectionTopRight = Template.bind({});
DirectionTopRight.args = {
  defaultValue: 'Placeholder',
  value: '1',
  items: [
    { value: '1', content: 'value 1' },
    { value: '2', content: 'value 2', disabled: true },
    { value: '3', content: 'value 3' },
    { value: '4', content: 'value 4' },
    { value: '5', content: 'value 5' },
  ],
  direction: 'top-right',
  onChange: action('onChangeValue'),
};

export const DirectionTopLeft = Template.bind({});
DirectionTopLeft.args = {
  defaultValue: 'Placeholder',
  value: '1',
  items: [
    { value: '1', content: 'value 1' },
    { value: '2', content: 'value 2', disabled: true },
    { value: '3', content: 'value 3' },
    { value: '4', content: 'value 4' },
    { value: '5', content: 'value 5' },
  ],
  direction: 'top-left',
  onChange: action('onChangeValue'),
};

export const DirectionBottomRight = Template.bind({});
DirectionBottomRight.args = {
  defaultValue: 'Placeholder',
  value: '1',
  items: [
    { value: '1', content: 'value 1' },
    { value: '2', content: 'value 2', disabled: true },
    { value: '3', content: 'value 3' },
    { value: '4', content: 'value 4' },
    { value: '5', content: 'value 5' },
  ],
  direction: 'bottom-right',
  onChange: action('onChangeValue'),
};

export const DirectionBottomLeft = Template.bind({});
DirectionBottomLeft.args = {
  defaultValue: 'Placeholder',
  value: '1',
  items: [
    { value: '1', content: 'value 1' },
    { value: '2', content: 'value 2', disabled: true },
    { value: '3', content: 'value 3' },
    { value: '4', content: 'value 4' },
    { value: '5', content: 'value 5' },
  ],
  direction: 'bottom-left',
  onChange: action('onChangeValue'),
};
