import { render, screen } from '@testing-library/react';
import { PageTransition } from '@/components/layout/PageTransition';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

// Mock Framer Motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe('PageTransition Component', () => {
  it('renders children content', () => {
    render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <PageTransition>
          <div data-testid="child-content">Test Content</div>
        </PageTransition>
      </MemoryRouter>
    );
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('applies the correct motion variants', () => {
    const { container } = render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <PageTransition>
          <div>Test Content</div>
        </PageTransition>
      </MemoryRouter>
    );

    const motionDiv = container.querySelector('div');
    expect(motionDiv).toHaveAttribute('initial', 'initial');
    expect(motionDiv).toHaveAttribute('animate', 'animate');
    expect(motionDiv).toHaveAttribute('exit', 'exit');
  });
});