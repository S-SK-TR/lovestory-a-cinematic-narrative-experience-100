import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { useStore } from '@/core/store';

// Mock Zustand store
vi.mock('@/core/store', () => ({
  useStore: vi.fn()
}))

// Mock NavLink
vi.mock('react-router-dom', async (importOriginal) => {
  const original = await importOriginal()
  return {
    ...original,
    NavLink: ({ children, to, className }) => (
      <a href={to} className={className}>{children}</a>
    )
  }
})

describe('AppShell Component', () => {
  const mockSetTheme = vi.fn()

  beforeEach(() => {
    vi.mocked(useStore).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      user: null,
      setUser: vi.fn(),
      isLoading: false,
      setLoading: vi.fn()
    })
  })

  it('renders the sidebar with navigation items', () => {
    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>
    )
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Lovestory')).toBeInTheDocument()
  })

  it('renders the mobile bottom navigation', () => {
    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>
    )
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('toggles theme when theme button is clicked', () => {
    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>
    )
    const themeButton = screen.getByLabelText('Switch to light mode')
    fireEvent.click(themeButton)
    expect(mockSetTheme).toHaveBeenCalledWith('light')
  })

  it('renders the user profile section', () => {
    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>
    )
    expect(screen.getByText('Ava Romance')).toBeInTheDocument()
    expect(screen.getByText('ava.romance@example.com')).toBeInTheDocument()
  })

  it('renders the notifications button', () => {
    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>
    )
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument()
  })
})
