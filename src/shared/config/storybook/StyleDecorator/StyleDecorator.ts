import { DecoratorFn } from '@storybook/react';

// eslint-disable-next-line
import '@/app/styles/index.scss';

export const StyleDecorator: DecoratorFn = (story) => story();
