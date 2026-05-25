import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';
import { useStore } from '@/core/store';

// Mock Zustand store
vi.mock('@/core/store', () => ({
  useStore: vi.fn()
}))

// Mock child components
vi.mock('@/components/layout/AppShell', () => ({
  AppShell: () => <div data-testid="app-shell">AppShell</div>
}))

vi.mock('@/pages/Home', () => ({
  default: () => <div data-testid="home-page">Home</div>
}))

vi.mock('@/features/not-found/NotFound', () => ({
  default: () => <div data-testid="not-found">Not Found</div>
}))

describe('App Component', () => {
  beforeEach(() => {
    // Default mock implementation
    vi.mocked(useStore).mockReturnValue({
      theme: 'dark',
      setTheme: vi.fn(),
      user: null,
      setUser: vi.fn(),
      isLoading: false,
      setLoading: vi.fn()
    })
  })

  it('renders the AppShell component', () => {
    render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByTestId('app-shell')).toBeInTheDocument()
  })

  it('renders the Home page for root route', () => {
    render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByTestId('home-page')).toBeInTheDocument()
  })

  it('renders the NotFound component for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={[ '/unknown' ]}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByTestId('not-found')).toBeInTheDocument()
  })

  it('applies the correct theme class', () => {
    const { container } = render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App />
      </MemoryRouter>
    )
    expect(container.firstChild).toHaveClass('dark')
  })

  it('uses PageTransition for Home and NotFound routes', () => {
    render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App />
      </MemoryRouter>
    )
    // Check if PageTransition is used by looking for its motion.div
    expect(screen.getByTestId('home-page').parentElement?.parentElement).toHaveAttribute('data-framer-motion')
  })
})
