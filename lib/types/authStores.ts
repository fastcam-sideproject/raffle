export type AuthStore = {
  userToken: string;
  setUserToken: (userToken: string) => void;
  logout: () => void;
};
