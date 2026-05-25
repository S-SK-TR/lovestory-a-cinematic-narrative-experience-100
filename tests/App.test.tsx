import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';
import { useStore } from '@/core/store';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the store
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

  it('renders the AppShell component', () => {
    render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('app-shell')).toBeInTheDocument();
  });

  it('renders the Home page at root route', () => {
    render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('renders the NotFound component for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={[ '/unknown' ]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });

  it('applies the theme class from store', () => {
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

    const appContainer = screen.getByTestId('app-shell').parentElement;
    expect(appContainer).toHaveClass('light');
  });
});