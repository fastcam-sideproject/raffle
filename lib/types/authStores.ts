export type AuthStore = {
  userToken: string;
  refreshToken: string;
  setUserToken: (userToken: string, refreshToken: string) => void;
  logout: () => void;
};
