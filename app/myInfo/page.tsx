'use client';

import React from 'react';
import MyInfoStyle from '../../components/MyInfoStyle';
import useMyInfo from '../../lib/hooks/useMyInfo';

export default function MyInfoPage() {
  const { data: userData, isLoading, isError, error } = useMyInfo();

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return <div>Error: {error instanceof Error ? error.message : JSON.stringify(error)}</div>;

  if (!userData) return <div>로그인이 필요합니다.</div>;

  return <MyInfoStyle userData={userData} />;
}
