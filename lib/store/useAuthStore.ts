import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AuthStore } from '../types/authStore';

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      userToken: '',
      setUserToken: (userToken) => {
        sessionStorage.setItem('access_token', userToken);
        set({ userToken });
      },
      logout: () => {
        sessionStorage.removeItem('access_token');
        set({ userToken: '' });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useAuthStore;
