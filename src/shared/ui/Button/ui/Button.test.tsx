import { render, screen } from '@testing-library/react';

import { Button } from 'shared/ui/Button';
import { ThemeButton } from 'shared/ui/Button/ui/Button';

describe('Button', () => {
  test('renders Button', () => {
    render(<Button>TEST</Button>);

    expect(screen.getByText('TEST')).toBeInTheDocument();
  });

  test('renders button with theme clear', () => {
    render(<Button theme={ThemeButton.CLEAR}>TEST</Button>);

    expect(screen.getByText('TEST')).toHaveClass('clear');
    screen.debug();
  });
});
