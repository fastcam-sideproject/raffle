import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
  userToken: string;
  setUserToken: (userToken: string) => void;
  logout: () => void;
};

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
