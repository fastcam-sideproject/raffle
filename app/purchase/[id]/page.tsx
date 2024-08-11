'use client';

import { useEffect, useState } from 'react';
import { getRaffleData } from '../../../api/raffle/raffleApi';
import { useAuthStore } from '../../../lib/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { RaffleItem } from '../../../lib/types/item';

export default function PurchasePage({ params }) {
  const { id } = params;
  const [raffleItem, setRaffleItem] = useState<RaffleItem>({
    ticketPrice: 0,
    item: {
      name: '',
      description: '',
      imageUrl: '',
    },
  });
  const userToken = useAuthStore((state) => state.userToken);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['raffleItem', userToken],
    queryFn: getRaffleData,
    enabled: !!userToken,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data && id) {
      const foundItem = data.find((raffle: { id: number }) => raffle.id === parseInt(id));
      setRaffleItem(foundItem);
    }
  }, [data, id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !raffleItem) {
    return <div>Error: {error ? error.message : 'Item not found'}</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">응모 하기</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <section className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">응모 상품 정보</h2>
            <div className="flex items-center space-x-4">
              <Image
                src={raffleItem.item.imageUrl}
                alt={raffleItem.item.name}
                width={100}
                height={100}
                className="rounded-lg"
              />
              <div>
                <h3 className="font-medium">{raffleItem.item.name}</h3>
                <p className="text-sm text-gray-600">{raffleItem.item.description}</p>
                <p className="font-bold">{raffleItem.ticketPrice}원</p>
              </div>
            </div>
          </section>

          <section className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">주문자 정보</h2>
            <div className="space-y-2">
              <p>홍길동</p>
              <p>010-1111-1111</p>
              <p>xx@xx.com</p>
            </div>
          </section>

          <section className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">배송 정보</h2>
            <div className="space-y-2">
              <p>홍길동</p>
              <p>010-1111-1111</p>
              <p>서울특별시 서대문구 정산로7길 성산로7길</p>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">최종 결제 내역</h2>
            <div className="space-y-2">
              <p>상품가격: {raffleItem.ticketPrice}원</p>
              <p className="font-bold">총 결제 금액: {raffleItem.ticketPrice}원</p>
            </div>
          </section>

          <section className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">결제하기</h2>
            <button className="w-full bg-yellow-400 text-black py-2 rounded-lg">KakaoPay</button>
          </section>

          <section className="border p-4 rounded-lg">
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>전체동의</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>구매조건 확인 및 결제 진행 동의</span>
              </label>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
