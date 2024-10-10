'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import useMyInfo from '../lib/hooks/useMyInfo';

export default function MyInfoStyle() {
  const router = useRouter();
  const { data: userData, isLoading, isError, error } = useMyInfo();

  if (isLoading) return <div>로딩 중...</div>;

  if (isError)
    return <div>Error: {error instanceof Error ? error.message : JSON.stringify(error)}</div>;

  if (!userData) return <div>로그인이 필요합니다.</div>;

  const handleMemberInfoNavigation = () => {
    router.push('/myInfo/memberInfo');
  };

  return (
    <main className="flex flex-col items-center justify-center h-[40rem] p-4 sm:p-8">
      <section className="w-full bg-white p-8 rounded shadow-lg  max-w-md sm:max-w-xl">
        <div className="flex flex-col items-center mb-6">
          <div className="w-auto h-auto bg-gray-400 rounded-full p-5 mb-5">
            <img
              src="/icon/mypageProfile.svg"
              alt="나의 정보 프로필 아이콘"
              className="w-25 h-25"
            />
          </div>
          <h2 className="text-xl font-semibold">{userData.name}</h2>
          <div className="flex gap-2">
            <img src="/icon/email.svg" alt="유저의 이메일 아이콘" className="w-4 sm:w-5 h-auto " />
            <p className="text-gray-600 text-sm sm:text-lg">{userData.email}</p>
          </div>
        </div>
        <ul className="w-full flex flex-col gap-4 items-center">
          <li
            className="w-full sm:w-2/3 flex items-center justify-between py-2 px-4 bg-white border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
            onClick={handleMemberInfoNavigation}
          >
            <div className="flex gap-2">
              <img
                src="/icon/profile.svg"
                alt="유저의 프로필 아이콘"
                className="w-4 sm:w-5 h-auto"
              />
              <h4 className="text-base sm:text-lg">회원 정보</h4>
            </div>
            <span>&gt;</span>
          </li>
          <li
            className="w-full sm:w-2/3 flex items-center justify-between py-2 px-4 bg-white border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => router.push('/myInfo/winnerHistory')}
          >
            <div className="flex gap-2">
              <img
                src="/icon/submissionHistory.svg"
                alt="래플 이력 아이콘"
                className="w-4 sm:w-5 h-auto"
              />
              <h4 className="text-base sm:text-lg">당첨 내역</h4>
            </div>
            <span>&gt;</span>
          </li>
          <li
            className="w-full sm:w-2/3 flex items-center justify-between py-2 px-4 bg-white border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => router.push('/myInfo/purchaseHistory')}
          >
            <div className="flex gap-2">
              <img
                src="/icon/submissionHistory.svg"
                alt="래플 이력 아이콘"
                className="w-4 sm:w-5 h-auto"
              />
              <h4 className="text-base sm:text-lg">래플 이력</h4>
            </div>
            <span>&gt;</span>
          </li>
        </ul>
      </section>
    </main>
  );
}
