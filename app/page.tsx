'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '../lib/store/useAuthStore';
import Banner from '../components/Banner/Banner';

export default function Home() {
  const router = useRouter();
  const setUserToken = useAuthStore((state) => state.setUserToken);

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('access_token');

    if (token) {
      localStorage.setItem('access_token', token);
      setUserToken(token);
      router.replace('/');
    }
  }, [router, setUserToken]);

  return <Banner />;
}
