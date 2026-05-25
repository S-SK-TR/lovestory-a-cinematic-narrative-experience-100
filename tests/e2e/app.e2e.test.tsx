import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../../src/App';
import * as store from '../../src/core/store';

// Mock Zustand store for consistent testing
const mockUseStore = vi.fn();
vi.mock('../../src/core/store', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useStore: (...args: any[]) => mockUseStore(...args),
  };
});

// Mock framer-motion to simplify testing of animations
vi.mock('framer-motion', () => ({
  motion: {
    div: vi.fn(({ children }) => <div data-testid="motion-div">{children}</div>),
  },
  AnimatePresence: vi.fn(({ children }) => <div data-testid="animate-presence">{children}</div>),
}));

describe('UI E2E App Flow Tests', () => {
  beforeEach(() => {
    // Reset mock before each test
    mockUseStore.mockReturnValue({ theme: 'dark' });
  });

  it('renders the application correctly and handles basic page loading', async () => {
    render(
      <MemoryRouter initialEntries={['/']}> {/* App artık BrowserRouter içermediği için MemoryRouter ile test edilebilir */}
        <App />
      </MemoryRouter>
    );

    // Uygulamanın en azından ana şablonunu (AppShell'den gelenler) render edebildiğini doğrula
    expect(screen.getByText('Lovestory')).toBeInTheDocument(); // AppShell'deki logo
    expect(screen.getByText('Welcome to Lovestory')).toBeInTheDocument(); // Home page'deki başlık
  });

  it('renders a 404 page for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-e2e-route']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('The cinematic journey you seek is not found.')).toBeInTheDocument(); // NotFound component'inden gelen metin
  });
});
