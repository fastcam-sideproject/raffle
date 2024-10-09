'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getAdminRaffleItemDetail } from '../../api/raffle/adminApi';
import useAuthStore from '../../lib/store/useAuthStore';

export default function AdminItemDetail({ params: { id } }: { params: { id: number } }) {
  const userToken = useAuthStore((state) => state.userToken);
  const [data, setData] = useState<any>(null);

  const fetchGetAdminItem = async (id: number): Promise<void> => {
    try {
      const result = await getAdminRaffleItemDetail(userToken, id);
      setData(result);
    } catch (error) {
      console.error('Failed to fetch raffle data:', error);
    }
  };

  useEffect(() => {
    fetchGetAdminItem(id);
  }, [id]);

  if (!data) {
    return <p>Loading...</p>;
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <>
      <section className="w-[100%] flex flex-col gap-8 items-center">
        <div className="w-[100%] grid grid-cols-2 items-center">
          <Image
            width={200}
            height={200}
            src={data.imageUrl}
            alt={data.name}
            className="w-auto h-auto"
          />
          <div className="w-[100%] flex flex-col gap-4 border-[1px] border-primary p-4">
            <div className="border-b border-primary">
              <span className="font-bold">상품 이름</span> <span>{data.name}</span>
            </div>
            <div className="border-b border-primary">
              <span className="font-bold">카테고리</span> <span>{data.category}</span>
            </div>
            <div className="border-b border-primary">
              <span className="font-bold">설정된 티켓 수 </span>
              <span>{data.defaultTotalCount}</span>
            </div>
            <div className="border-b border-primary">
              <span className="font-bold">래플 상태 </span>
              {data.possibleRaffle ? <span>래플 진행중</span> : <span>래플 종료</span>}
            </div>
            <div className="border-b border-primary">
              <span className="font-bold">시작 한 날짜 </span>
              <span>{formatDateTime(data.createdDate)}</span>
            </div>
            <div className="border-b border-primary">
              <span className="font-bold">업데이트 한 날짜 </span>
              <span>{formatDateTime(data.updatedDate)}</span>
            </div>
            <div className="border-b border-primary">
              <span className="font-bold">삭제일 </span>
              <span>{data.deletedDate ? formatDateTime(data.deletedDate) : '래플 진행중'}</span>
            </div>
          </div>
        </div>
        <label htmlFor="itemDetailImage" className="flex flex-col gap-2">
          상세 이미지 : 물건의 상세 이미지를 올려주세요
          <input
            type="file"
            name="itemDetailImage"
            accept="image/*"
            className="p-4 rounded-lg border-solid border-[1px]"
          />
        </label>
        <div className="flex flex-col">
          {data?.imageList.map((item: any) => (
            <Image
              key={item.id}
              width={1000}
              height={1000}
              src={item.imageUrl}
              alt={item.id}
              className="w-[100%] h-[100%]"
            />
          ))}
        </div>
      </section>
    </>
  );
}
