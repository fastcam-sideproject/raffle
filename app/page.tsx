'use client';
import HomeMain from '../components/Home/HomeMain';
import HeaderNav from '../components/Header/HeaderNav';
import AuthHandler from '../components/AuthHandler';
import useAuthStore from '../lib/store/useAuthStore';

export default function HomePage() {
  const { userToken } = useAuthStore((state) => ({
    userToken: state.userToken,
  }));

  return (
    <>
      <HeaderNav />
      <HomeMain />
      <AuthHandler />
    </>
  );
}
