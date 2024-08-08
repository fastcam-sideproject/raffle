import { create } from 'zustand';

type AuthStore = {
  userToken: string;
  setUserToken: (userToken: string) => void;
  logout: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  userToken: '',
  setUserToken: (userToken) => set({ userToken }),
  logout: () => set({ userToken: '' }),
}));

export default useAuthStore;
