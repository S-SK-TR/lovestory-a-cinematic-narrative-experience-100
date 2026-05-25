import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// PREMIUM UI: Merkezi state yönetimi için Zustand store
// PREMIUM UI: Persist middleware ile localStorage entegrasyonu
interface AppState {
  theme: 'dark' | 'light';
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  isLoading: boolean;
}

interface AppActions {
  setTheme: (theme: 'dark' | 'light') => void;
  setUser: (user: AppState['user']) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      theme: 'dark',
      user: null,
      isLoading: false,
      setTheme: (theme) => set({ theme }),
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'app-store',
      partialize: (state) => ({ theme: state.theme, user: state.user }),
    }
  )
);