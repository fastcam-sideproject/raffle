'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import useAuthStore from '../../lib/store/useAuthStore';
import { getMyPage } from '../../api/user/mypageApi';
import { UserData } from '../../lib/types/user';



export default function MyPage() {
    const userToken = useAuthStore((state) => state.userToken);

    const { data: userData, isLoading, isError, error } = useQuery<UserData>({
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
        <div className="flex flex-col items-center justify-center h-[70vh]">
            <div className="w-full bg-white p-8 rounded shadow-md  max-w-2xl">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-auto h-auto bg-gray-400 rounded-full p-5 mb-5 ">
                      <Image src='/icon/mypageProfile.svg' alt='나의 정보 프로필 아이콘'
                             width={100} height={100}
                      />
                    </div>
                    <h2 className="text-xl font-semibold">{userData.name}</h2>
                    <div className='flex gap-2'>
                    <Image src='/icon/email.svg' alt='유저의 이메일 아이콘' width={20} height={20}/>
                    <p className="text-gray-600">{userData.email}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 items-center">
                    <button className="w-2/3 flex items-center justify-between  py-2 px-4 bg-white border border-gray-300 rounded hover:bg-gray-100">
                        <div  className='flex gap-2'>
                        <Image src='/image/profile.svg' alt='유저의 프로필 아이콘' width={20} height={20}/>
                        <h4 className='text-lg'>회원 정보</h4>
                        </div>
                        <span>&gt;</span>
                    </button>
                    <button className="w-2/3 py-2 px-4 bg-white border border-gray-300 rounded-md text-left flex items-center justify-between hover:bg-gray-100">
                    <div  className='flex gap-2'>
                        <Image src='/icon/submissionHistory.svg' alt='응모 이력 아이콘' width={20} height={20}/>
                        <h4 className='text-lg'>응모 이력</h4>
                        </div>
                        <span>&gt;</span>
                    </button>
                </div>
            </div>
        </div>
    );
}