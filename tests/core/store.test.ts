import { useStore } from '@/core/store';
import { act, renderHook } from '@testing-library/react';

vi.mock('zustand', () => ({
  create: (fn: any) => fn()
}));

vi.mock('zustand/middleware', () => ({
  persist: (fn: any) => fn
}));

describe('App Store', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useStore());

    expect(result.current.theme).toBe('dark');
    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('updates theme', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.setTheme('light');
    });

    expect(result.current.theme).toBe('light');
  });

  it('updates user', () => {
    const { result } = renderHook(() => useStore());
    const testUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com'
    };

    act(() => {
      result.current.setUser(testUser);
    });

    expect(result.current.user).toEqual(testUser);
  });

  it('updates loading state', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.isLoading).toBe(true);
  });
});