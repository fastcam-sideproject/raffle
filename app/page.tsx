'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import HomeMain from '../components/Home/HomeMain';
import HeaderNav from '../components/Header/HeaderNav';
import useAuthStore from '../lib/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { postVerifyPhone } from '../api/user/phoneNumberApi';

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

  const userToken = useAuthStore((state) => state.userToken);
  const mutation = useMutation({
    mutationKey: ['verifyPhone'],
    mutationFn: () => postVerifyPhone({ phoneNumber: '010-3844-7955', userToken }),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('휴대폰 인증번호 요청 실패', error);
    },
  });

  return (
    <>
      <HeaderNav />
      <HomeMain />
    </>
  );
}
