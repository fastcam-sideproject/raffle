'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import useAuthStore from '../lib/store/useAuthStore';
import { refreshApi } from '../api/user/refreshApi';

export default function AuthHandler() {
  const router = useRouter();
  const { setUserToken, logout, refreshToken } = useAuthStore((state) => ({
    setUserToken: state.setUserToken,
    logout: state.logout,
    refreshToken: state.refreshToken,
  }));

  const mutate = useMutation({
    mutationKey: ['refreshToken'],
    mutationFn: () => refreshApi(refreshToken),
    onSuccess: (data) => {
      const { jwt: accessToken } = data;
      if (accessToken) {
        localStorage.setItem('access_token', accessToken);
        setUserToken(accessToken, refreshToken);
      } else {
        logout();
      }
    },
    onError: (error) => {
      console.error('토큰 갱신 실패', error);
      logout();
    },
  });

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

  useEffect(() => {
    if (!refreshToken) return;
    const intervalId = setInterval(
      () => {
        mutate.mutate();
      },
      15 * 60 * 1000,
    );

    return () => clearInterval(intervalId);
  }, [mutate, refreshToken]);

  return null;
}
