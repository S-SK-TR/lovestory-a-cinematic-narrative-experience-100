import { render, screen } from '@testing-library/react';
import Home from '@/pages/Home';
import { useStore } from '@/core/store';

// Mock Zustand store
vi.mock('@/core/store', () => ({
  useStore: vi.fn()
}))

// Mock PageContainer
vi.mock('@/components/layout/PageContainer', () => ({
  PageContainer: ({ children, title, description }: { children: React.ReactNode; title?: string; description?: string }) => (
    <div data-testid="page-container">
      {title && <h1>{title}</h1>}
      {description && <p>{description}</p>}
      {children}
    </div>
  )
}))

describe('Home Page', () => {
  beforeEach(() => {
    vi.mocked(useStore).mockReturnValue({
      theme: 'dark',
      setTheme: vi.fn(),
      user: null,
      setUser: vi.fn(),
      isLoading: false,
      setLoading: vi.fn()
    })
  })

  it('renders the welcome message', () => {
    render(<Home />)
    expect(screen.getByText('Welcome to Lovestory')).toBeInTheDocument()
  })

  it('renders the cinematic narrative description', () => {
    render(<Home />)
    expect(screen.getByText(/A Cinematic Narrative Experience/)).toBeInTheDocument()
  })

  it('renders the GitHub link', () => {
    render(<Home />)
    const link = screen.getByText('Visit our GitHub')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://github.com/lovable-ai/lovestory')
  })

  it('uses the PageContainer component', () => {
    render(<Home />)
    expect(screen.getByTestId('page-container')).toBeInTheDocument()
  })

  it('has proper animation properties', () => {
    const { container } = render(<Home />)
    const motionDiv = container.querySelector('[data-framer-motion]')
    expect(motionDiv).toBeInTheDocument()
  })

  it('applies correct theme class based on store', () => {
    const { container } = render(<Home />)
    const cardDiv = container.querySelector('.glass-card')
    expect(cardDiv).toBeInTheDocument()
  })
})
