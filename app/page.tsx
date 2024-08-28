'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import HomeMain from '../components/Home/HomeMain';
import HeaderNav from '../components/Header/HeaderNav';
import useAuthStore from '../lib/store/useAuthStore';

export default function Home() {
  const router = useRouter();
  const setUserToken = useAuthStore((state) => state.setUserToken);

  useEffect(() => {
    const url = new URL(window.location.href);
    const accessToken = url.searchParams.get('access_token');
    const refreshToken = url.searchParams.get('refresh_token');

    /**
     * 만약 accessToken과 refreshToken이 있다면 sessionStorage에 저장하고 setUserToken을 호출하여 accessToken과 refreshToken을 저장.
     * 그리고 router를 이용하여 홈으로 이동.
     */
    if (accessToken && refreshToken) {
      sessionStorage.setItem('access_token', accessToken);
      sessionStorage.setItem('refresh_token', refreshToken);
      setUserToken(accessToken, refreshToken);
      router.replace('/');
    }
  }, [router, setUserToken]);



  return (
    <>
      <HeaderNav />
      <HomeMain />
    </>
  );
}
