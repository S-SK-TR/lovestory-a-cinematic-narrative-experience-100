import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '@/features/not-found/NotFound';

vi.mock('@/components/layout/PageContainer', () => ({
  PageContainer: ({ children }: any) => <div>{children}</div>
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  }
}));

vi.mock('lucide-react', () => ({
  HelpCircle: () => <div data-testid="help-icon">HelpCircle</div>
}));

describe('NotFound Component', () => {
  it('renders 404 message', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });

  it('renders help icon', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByTestId('help-icon')).toBeInTheDocument();
  });

  it('renders return home link', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /return to lovestory home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});