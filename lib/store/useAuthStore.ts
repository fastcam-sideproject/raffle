import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AuthStore } from '../types/authStores';

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      userToken: '',
      refreshToken: '',
      setUserToken: (userToken, refreshToken) => {
        sessionStorage.setItem('access_token', userToken);
        sessionStorage.setItem('refresh_token', refreshToken);
        set({ userToken, refreshToken });
      },
      logout: () => {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        set({ userToken: '', refreshToken: '' });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useAuthStore;
