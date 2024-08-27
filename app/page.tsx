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
    const token = url.searchParams.get('access_token');

    /**
     * 만약 token이 있다면 localStorage에 저장하고 setUserToken을 호출하여 token을 저장.
     * 그리고 router를 이용하여 홈으로 이동.
     */
    if (token) {
      sessionStorage.setItem('access_token', token);
      setUserToken(token);
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
