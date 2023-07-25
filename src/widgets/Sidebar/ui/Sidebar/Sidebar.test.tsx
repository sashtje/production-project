import { fireEvent, screen } from '@testing-library/react';

import { Sidebar } from 'widgets';
import { renderWithTranslation } from 'shared/lib/tests';

describe('Sidebar', () => {
  test('renders sidebar', () => {
    renderWithTranslation(<Sidebar />);

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('toggles sidebar', () => {
    renderWithTranslation(<Sidebar />);

    const toggleBtn = screen.getByTestId('sidebar-toggle');

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();

    fireEvent.click(toggleBtn);

    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
  });
});
