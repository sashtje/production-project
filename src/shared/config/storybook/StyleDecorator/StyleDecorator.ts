import { DecoratorFn } from '@storybook/react';

// eslint-disable-next-line fsd-checker/layer-imports
import '@/app/styles/index.scss';

export const StyleDecorator: DecoratorFn = (story) => story();
