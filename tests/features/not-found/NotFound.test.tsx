import { render, screen } from '@testing-library/react';
import NotFound from '@/features/not-found/NotFound';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

// Mock PageContainer
vi.mock('@/components/layout/PageContainer', () => ({
  PageContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  }
}));

describe('NotFound Component', () => {
  it('renders the 404 message', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });

  it('renders the descriptive text', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByText(/The cinematic journey you seek is not found/i)).toBeInTheDocument();
  });

  it('renders the return home link', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    const link = screen.getByText('Return to Lovestory Home');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});