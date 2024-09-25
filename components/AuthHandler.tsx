'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../lib/store/useAuthStore';

export default function AuthHandler() {
  const router = useRouter();
  const { setUserToken } = useAuthStore((state) => ({
    setUserToken: state.setUserToken,
  }));

  useEffect(() => {
    const url = new URL(window.location.href);
    const accessToken = url.searchParams.get('access_token');
    const refreshToken = url.searchParams.get('refresh_token');

    /**
     * @description
     * 만약 accessToken과 refreshToken이 있다면 localStorage에 저장하고 setUserToken을 호출하여 accessToken과 refreshToken을 저장.
     * 그리고 router를 이용하여 홈으로 이동.
     */
    if (accessToken && refreshToken) {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      setUserToken(accessToken, refreshToken);
      router.replace('/');
    }
  }, [router, setUserToken]);

  return null;
}
