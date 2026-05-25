import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PageTransition } from '@/components/layout/PageTransition';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    useLocation: () => ({ pathname: '/test' })
  };
});

describe('PageTransition Component', () => {
  it('renders children content', () => {
    render(
      <MemoryRouter>
        <PageTransition>
          <div data-testid="child-content">Test Content</div>
        </PageTransition>
      </MemoryRouter>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });
});