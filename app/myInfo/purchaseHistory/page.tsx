'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { getPurchaseHistory } from '../../../api/raffle/purchaseItemApi';
import useAuthStore from '../../../lib/store/useAuthStore';
import { PurchaseHistoryResponse } from '../../../lib/types/purchase';

export default function PurchaseHistoryPage() {
  const userToken = useAuthStore<string>((state) => state.userToken);
  const [offset, setOffset] = useState<number>(0);
  const [size] = useState<number>(10);

  const {
    data: purchaseItems,
    isLoading,
    isError,
    error,
  } = useQuery<PurchaseHistoryResponse>({
    queryKey: ['purchaseHistory', offset, size],
    queryFn: () => getPurchaseHistory({ userToken, offset, size }),
    enabled: !!userToken,
  });

  if (!userToken) {
    return <div className="text-center py-8">로그인이 필요합니다.</div>;
  }

  if (isLoading) {
    return <div className="text-center py-8">로딩 중...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">
        오류 발생: {error instanceof Error ? error.message : '알 수 없는 오류'}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-primary">래플 이력</h2>
      {purchaseItems && purchaseItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {purchaseItems.map((purchaseItem) => (
            <div
              key={purchaseItem.raffle.id}
              className="bg-white rounded-md shadow-md overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={purchaseItem.raffle.item.imageUrl}
                  alt={purchaseItem.raffle.item.name}
                  width={500}
                  height={200}
                  className="w-full h-60 object-cover"
                  priority
                />
                <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white px-2 py-1 text-lg">
                  {purchaseItem.raffle.status === 'COMPLETED'
                    ? purchaseItem.isWinner
                      ? '당첨'
                      : '낙첨'
                    : '추첨 전'}
                </div>
                <div className="absolute bottom-0 right-0 bg-white bg-opacity-75 px-2 py-1 text-lg">
                  응모 수: {purchaseItem.count}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{purchaseItem.raffle.item.name}</h3>
                <p className="mb-1">{purchaseItem.raffle.id}번 래플</p>
                <p className="mb-1">가격: {purchaseItem.raffle.ticketPrice}원</p>
                {purchaseItem.raffle.status === 'COMPLETED' && (
                  <p className="font-medium">
                    {purchaseItem.isWinner
                      ? '아쉽게도 당첨되지 않았습니다.'
                      : `당첨자: ${purchaseItem.raffle.winner?.name}`}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">구매 내역이 없습니다.</div>
      )}
    </div>
  );
}
