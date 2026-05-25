import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { useStore } from '@/core/store';

vi.mock('@/core/store', () => ({
  useStore: vi.fn()
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    NavLink: ({ children, to, className }: any) => (
      <a href={to} className={className}>{children}</a>
    )
  };
});

describe('AppShell Component', () => {
  const mockSetTheme = vi.fn();

  beforeEach(() => {
    vi.mocked(useStore).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      user: null,
      setUser: vi.fn(),
      isLoading: false,
      setLoading: vi.fn()
    });
  });

  it('renders sidebar navigation items', () => {
    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
  });

  it('toggles theme when theme button is clicked', () => {
    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>
    );

    const themeButton = screen.getByRole('button', { name: /switch to light mode/i });
    fireEvent.click(themeButton);
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('renders mobile bottom navigation', () => {
    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders user profile section', () => {
    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>
    );

    expect(screen.getByText('Ava Romance')).toBeInTheDocument();
    expect(screen.getByText('ava.romance@example.com')).toBeInTheDocument();
  });
});