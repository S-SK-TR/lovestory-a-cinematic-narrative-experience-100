import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { useStore } from '@/core/store';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the store
vi.mock('@/core/store', () => ({
  useStore: vi.fn()
}));

// Mock the Outlet component
vi.mock('react-router-dom', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    Outlet: () => <div data-testid="outlet">Outlet Content</div>
  };
});

describe('AppShell Component', () => {
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

  it('renders the sidebar navigation items', () => {
    render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <AppShell />
      </MemoryRouter>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Lovestory')).toBeInTheDocument();
  });

  it('toggles theme when theme button is clicked', () => {
    const setThemeMock = vi.fn();
    vi.mocked(useStore).mockReturnValueOnce({
      theme: 'dark',
      setTheme: setThemeMock,
      user: null,
      setUser: vi.fn(),
      isLoading: false,
      setLoading: vi.fn()
    });

    render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <AppShell />
      </MemoryRouter>
    );

    const themeButton = screen.getByLabelText('Switch to light mode');
    fireEvent.click(themeButton);
    expect(setThemeMock).toHaveBeenCalledWith('light');
  });

  it('renders the mobile bottom navigation', () => {
    render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <AppShell />
      </MemoryRouter>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders the user profile section', () => {
    render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <AppShell />
      </MemoryRouter>
    );

    expect(screen.getByText('Ava Romance')).toBeInTheDocument();
    expect(screen.getByText('ava.romance@example.com')).toBeInTheDocument();
  });
});