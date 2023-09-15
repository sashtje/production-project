import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Flex } from './Flex';

export default {
  title: 'shared/Flex',
  component: Flex,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const Row = Template.bind({});
Row.args = {
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  ),
  direction: 'row',
};

export const RowGap4 = Template.bind({});
RowGap4.args = {
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  ),
  gap: '4',
  direction: 'row',
};

export const RowGap8 = Template.bind({});
RowGap8.args = {
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  ),
  gap: '8',
  direction: 'row',
};

export const RowGap16 = Template.bind({});
RowGap16.args = {
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  ),
  gap: '16',
  direction: 'row',
};

export const RowGap32 = Template.bind({});
RowGap32.args = {
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  ),
  gap: '32',
  direction: 'row',
};

export const Column = Template.bind({});
Column.args = {
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  ),
  direction: 'column',
};

export const ColumnGap8 = Template.bind({});
ColumnGap8.args = {
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  ),
  direction: 'column',
  gap: '8',
};

export const ColumnGap32 = Template.bind({});
ColumnGap32.args = {
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  ),
  direction: 'column',
  gap: '32',
};
