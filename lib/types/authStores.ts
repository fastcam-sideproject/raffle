export type AuthStore = {
  hydrateToken: () => void;
  userToken: string;
  refreshToken: string;
  setUserToken: (userToken: string, refreshToken: string) => void;
  logout: () => void;
};
