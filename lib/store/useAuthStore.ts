import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthStore } from '../types/AuthStore';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      userToken: '',
      setUserToken: (userToken) => set({ userToken }),
      logout: () => set({ userToken: '' }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
