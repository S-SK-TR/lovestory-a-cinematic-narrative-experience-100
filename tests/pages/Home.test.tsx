import { render, screen } from '@testing-library/react';
import Home from '@/pages/Home';
import { useStore } from '@/core/store';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the store
vi.mock('@/core/store', () => ({
  useStore: vi.fn()
}));

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

describe('Home Page', () => {
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

  it('renders the welcome message', () => {
    render(<Home />);
    expect(screen.getByText('Welcome to Lovestory')).toBeInTheDocument();
    expect(screen.getByText('A Cinematic Narrative Experience for premium users.')).toBeInTheDocument();
  });

  it('renders the GitHub link', () => {
    render(<Home />);
    const link = screen.getByText('Visit our GitHub');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/lovable-ai/lovestory');
  });

  it('applies the correct theme class', () => {
    vi.mocked(useStore).mockReturnValueOnce({
      theme: 'light',
      setTheme: vi.fn(),
      user: null,
      setUser: vi.fn(),
      isLoading: false,
      setLoading: vi.fn()
    });

    render(<Home />);
    const card = screen.getByText('Welcome to Lovestory').closest('div');
    expect(card).toHaveClass('glass-morphism');
  });
});