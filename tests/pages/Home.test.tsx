import { render, screen } from '@testing-library/react';
import Home from '@/pages/Home';
import { useStore } from '@/core/store';

vi.mock('@/core/store', () => ({
  useStore: vi.fn()
}));

vi.mock('@/components/layout/PageContainer', () => ({
  PageContainer: ({ children }: any) => <div>{children}</div>
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  }
}));

describe('Home Page', () => {
  beforeEach(() => {
    vi.mocked(useStore).mockReturnValue({
      theme: 'dark',
      setTheme: vi.fn(),
      user: null,
      setUser: vi.fn(),
      isLoading: false,
      setLoading: vi.fn()
    });
  });

  it('renders welcome message', () => {
    render(<Home />);
    expect(screen.getByText(/Welcome to Lovestory/i)).toBeInTheDocument();
  });

  it('renders application description', () => {
    render(<Home />);
    expect(screen.getByText(/A Cinematic Narrative Experience/i)).toBeInTheDocument();
  });

  it('renders GitHub link', () => {
    render(<Home />);
    const link = screen.getByRole('link', { name: /visit our github/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/lovable-ai/lovestory');
  });
});