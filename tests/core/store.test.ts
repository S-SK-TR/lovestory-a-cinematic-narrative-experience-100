import { useStore } from '@/core/store';
import { describe, it, expect, beforeEach } from 'vitest';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('App Store', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with default values', () => {
    const state = useStore.getState();
    expect(state.theme).toBe('dark');
    expect(state.user).toBeNull();
    expect(state.isLoading).toBe(false);
  });

  it('updates theme correctly', () => {
    const { setTheme } = useStore.getState();
    setTheme('light');
    expect(useStore.getState().theme).toBe('light');
  });

  it('updates user correctly', () => {
    const { setUser } = useStore.getState();
    const testUser = { id: '1', name: 'Test User', email: 'test@example.com' };
    setUser(testUser);
    expect(useStore.getState().user).toEqual(testUser);
  });

  it('updates loading state correctly', () => {
    const { setLoading } = useStore.getState();
    setLoading(true);
    expect(useStore.getState().isLoading).toBe(true);
  });

  it('persists theme and user to localStorage', () => {
    const { setTheme, setUser } = useStore.getState();
    setTheme('light');
    setUser({ id: '1', name: 'Test User', email: 'test@example.com' });

    // Simulate store persistence
    const storedState = JSON.parse(localStorage.getItem('app-store') || '{}');
    expect(storedState.state.theme).toBe('light');
    expect(storedState.state.user).toEqual({
      id: '1',
      name: 'Test User',
      email: 'test@example.com'
    });
  });
});