'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MyInfoStyle from '../../components/MyInfoStyle';
import useMyInfo from '../../lib/hooks/useMyInfo';

export default function MyInfoPage() {
  const { data: userData, isLoading, isError, error } = useMyInfo();
  const router = useRouter();

  useEffect(() => {
    if (!userData) {
      router.push('/');
    }
  }, [userData, router]);

  if (isLoading) return <div>로딩 중...</div>;

  if (isError)
    return <div>Error: {error instanceof Error ? error.message : JSON.stringify(error)}</div>;

  if (!userData) return <div>로그인이 필요합니다.</div>;

  return <MyInfoStyle userData={userData} />;
}
