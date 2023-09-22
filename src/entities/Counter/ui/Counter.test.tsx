import { screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';

import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

import { Counter } from './Counter';

describe('Counter', () => {
  test('should show value', () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } },
    });

    expect(screen.getByTestId('value-title')).toHaveTextContent('10');
  });

  test('should increment', () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } },
    });

    userEvent.click(screen.getByTestId('increment-btn'));

    expect(screen.getByTestId('value-title')).toHaveTextContent('11');
  });

  test('should decrement', () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } },
    });

    userEvent.click(screen.getByTestId('decrement-btn'));

    expect(screen.getByTestId('value-title')).toHaveTextContent('9');
  });
});
