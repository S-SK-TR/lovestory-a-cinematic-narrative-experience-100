import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';
import { useStore } from '@/core/store';

// Mock Zustand store
vi.mock('@/core/store', () => ({
  useStore: vi.fn()
}));

// Mock child components
vi.mock('@/components/layout/AppShell', () => ({
  AppShell: () => <div data-testid="app-shell">AppShell</div>
}));

vi.mock('@/pages/Home', () => ({
  default: () => <div data-testid="home-page">Home</div>
}));

vi.mock('@/features/not-found/NotFound', () => ({
  default: () => <div data-testid="not-found">Not Found</div>
}));

vi.mock('@/components/layout/PageTransition', () => ({
  PageTransition: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('App Component', () => {
  beforeEach(() => {
    // Default store mock
    vi.mocked(useStore).mockReturnValue({
      theme: 'dark',
      setTheme: vi.fn(),
      user: null,
      setUser: vi.fn(),
      isLoading: false,
      setLoading: vi.fn()
    });
  });

  it('renders AppShell component', () => {
    render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('app-shell')).toBeInTheDocument();
  });

  it('renders Home page with PageTransition', () => {
    render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('renders NotFound page for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={[ '/unknown' ]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });

  it('applies theme class from store', () => {
    vi.mocked(useStore).mockReturnValueOnce({
      theme: 'light',
      setTheme: vi.fn(),
      user: null,
      setUser: vi.fn(),
      isLoading: false,
      setLoading: vi.fn()
    });

    render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App />
      </MemoryRouter>
    );

    const appDiv = screen.getByTestId('app-shell').parentElement;
    expect(appDiv).toHaveClass('light');
  });
});