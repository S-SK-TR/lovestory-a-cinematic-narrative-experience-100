import { render, screen } from '@testing-library/react';
import { PageTransition } from '@/components/layout/PageTransition';
import { MemoryRouter } from 'react-router-dom';

vi.mock('react-router-dom', async (importOriginal) => {
  const original = await importOriginal()
  return {
    ...original,
    useLocation: () => ({ pathname: '/test' })
  }
})

describe('PageTransition Component', () => {
  it('renders children content', () => {
    render(
      <MemoryRouter>
        <PageTransition>
          <div data-testid="child-content">Test Content</div>
        </PageTransition>
      </MemoryRouter>
    )
    expect(screen.getByTestId('child-content')).toBeInTheDocument()
  })

  it('applies correct animation variants', () => {
    const { container } = render(
      <MemoryRouter>
        <PageTransition>
          <div>Test Content</div>
        </PageTransition>
      </MemoryRouter>
    )
    const motionDiv = container.firstChild
    expect(motionDiv).toHaveAttribute('data-framer-motion')
    expect(motionDiv).toHaveAttribute('initial', 'initial')
    expect(motionDiv).toHaveAttribute('animate', 'animate')
    expect(motionDiv).toHaveAttribute('exit', 'exit')
  })

  it('uses AnimatePresence with wait mode', () => {
    const { container } = render(
      <MemoryRouter>
        <PageTransition>
          <div>Test Content</div>
        </PageTransition>
      </MemoryRouter>
    )
    const animatePresence = container.firstChild?.parentElement
    expect(animatePresence).toHaveAttribute('mode', 'wait')
  })
})
