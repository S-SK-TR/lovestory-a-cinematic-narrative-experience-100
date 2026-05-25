import { render, screen } from '@testing-library/react';
import NotFound from '@/features/not-found/NotFound';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@/components/layout/PageContainer', () => ({
  PageContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-container">{children}</div>
  )
}))

describe('NotFound Component', () => {
  it('renders the 404 message', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    )
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument()
  })

  it('renders the descriptive text', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    )
    expect(screen.getByText(/The cinematic journey you seek is not found/)).toBeInTheDocument()
  })

  it('renders the return home link', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    )
    const link = screen.getByText('Return to Lovestory Home')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })

  it('has proper animation properties', () => {
    const { container } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    )
    const motionDiv = container.querySelector('[data-framer-motion]')
    expect(motionDiv).toBeInTheDocument()
  })

  it('uses the PageContainer component', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    )
    expect(screen.getByTestId('page-container')).toBeInTheDocument()
  })
})
