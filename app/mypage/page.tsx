'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import useAuthStore from '../../lib/store/useAuthStore';
import { getMyPage } from '../../api/user/mypageApi';

export default function MyPage() {
    const userToken = useAuthStore((state) => state.userToken);

    const { data: userData, isLoading, isError, error } = useQuery({
        queryKey: ['getMyPage'],
        queryFn: () => getMyPage(userToken),
        enabled: !!userToken,
    });

    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>Error: {error instanceof Error ? 
        error.message : JSON.stringify(error)
    }</div>;

    if(!userData) return <div>데이터가 없습니다.</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full bg-white p-8 rounded shadow-md  max-w-2xl">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-auto h-auto bg-gray-400 rounded-full p-5 mb-5 ">
                      <Image src='/icon/mypageProfile.svg' alt='나의 정보 프로필 아이콘'
                             width={100} height={100}
                      />
                    </div>
                    <h2 className="text-xl font-semibold">{userData.name}</h2>
                    <p className="text-gray-600">{userData.email}</p>
                </div>
                <div className="space-y-4">
                    <button className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md text-left flex items-center justify-between hover:bg-gray-100">
                        <span>회원 정보</span>
                        <span>&gt;</span>
                    </button>
                    <button className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md text-left flex items-center justify-between hover:bg-gray-100">
                        <span>응모 이력</span>
                        <span>&gt;</span>
                    </button>
                </div>
            </div>
        </div>
    );
}