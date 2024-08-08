import { create } from 'zustand';
type AuthStore = {
  userToken: string;
  setUserToken: (userToken: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  userToken: '',
  setUserToken: (userToken) => set({ userToken }),
  logout: () => set({ userToken: '' }),
}));
