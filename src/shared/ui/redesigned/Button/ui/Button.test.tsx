import { render, screen } from '@testing-library/react';

import { Button } from './Button';

describe('Button', () => {
  test('renders Button', () => {
    render(<Button>TEST</Button>);

    expect(screen.getByText('TEST')).toBeInTheDocument();
  });

  test('renders button with theme clear', () => {
    render(<Button variant="clear">TEST</Button>);

    expect(screen.getByText('TEST')).toHaveClass('clear');
    screen.debug();
  });
});
