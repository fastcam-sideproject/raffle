import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { AuthStore } from '../types/authStores';

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      userToken: '',
      refreshToken: '',
      setUserToken: (userToken, refreshToken) => {
        if (typeof window !== 'undefined') {
          Cookies.set('access_token', userToken);
          Cookies.set('refresh_token', refreshToken);
        }
        set({ userToken, refreshToken });
      },
      logout: () => {
        if (typeof window !== 'undefined') {
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
        }
        set({ userToken: '', refreshToken: '' });
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export default useAuthStore;
