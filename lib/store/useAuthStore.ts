import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AuthStore } from '../types/authStores';

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      userToken: '',
      refreshToken: '',
      setUserToken: (userToken, refreshToken) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('access_token', userToken);
          localStorage.setItem('refresh_token', refreshToken);
        }
        set({ userToken, refreshToken });
      },
      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
        set({ userToken: '', refreshToken: '' });
      },
    }),
    {
      name: 'auth-storage',
      storage: typeof window !== 'undefined' ? createJSONStorage(() => localStorage) : undefined,
    },
  ),
);

export default useAuthStore;
