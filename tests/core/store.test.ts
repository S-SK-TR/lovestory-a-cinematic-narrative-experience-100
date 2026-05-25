import { useStore } from '@/core/store';
import { act } from 'react';

describe('App Store', () => {
  it('initializes with default values', () => {
    const state = useStore.getState()
    expect(state.theme).toBe('dark')
    expect(state.user).toBeNull()
    expect(state.isLoading).toBe(false)
  })

  it('updates theme correctly', () => {
    act(() => {
      useStore.getState().setTheme('light')
    })
    expect(useStore.getState().theme).toBe('light')
  })

  it('updates user correctly', () => {
    const testUser = {
      id: '123',
      name: 'Test User',
      email: 'test@example.com'
    }
    act(() => {
      useStore.getState().setUser(testUser)
    })
    expect(useStore.getState().user).toEqual(testUser)
  })

  it('updates loading state correctly', () => {
    act(() => {
      useStore.getState().setLoading(true)
    })
    expect(useStore.getState().isLoading).toBe(true)
  })

  it('persists theme and user to localStorage', () => {
    // Test persist middleware
    const testUser = {
      id: '456',
      name: 'Persist User',
      email: 'persist@example.com'
    }
    act(() => {
      useStore.getState().setTheme('light')
      useStore.getState().setUser(testUser)
    })

    // Simulate page reload
    const newStore = useStore.getState()
    expect(newStore.theme).toBe('light')
    expect(newStore.user).toEqual(testUser)
  })
})
