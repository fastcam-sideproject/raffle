'use client';

import { useEffect, useState } from 'react';
import { getRaffleData } from '../../../api/raffle/raffleApi';
import { useAuthStore } from '../../../lib/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { RaffleItem } from '../../../lib/types/item';
import ShippingAddressForm from '../../../components/ShippingAddressForm';

export default function PurchasePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
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
  const [address, setAddress] = useState<string>('');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['raffleItem', userToken],
    queryFn: getRaffleData,
    enabled: !!userToken,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data && id) {
      const foundItem = data.find((raffle: { id: number }) => raffle.id === parseInt(id));
      if (foundItem) {
        setRaffleItem(foundItem);
      }
    }
  }, [data, id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !raffleItem) {
    return <div>Error: {error ? error.message : 'Item not found'}</div>;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit');
  };

  const handleAddressChange = (address: string) => {
    setAddress(address);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">응모 하기</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <section className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">응모 상품 정보</h2>
            <div className="flex items-center space-x-4">
              <Image
                src={raffleItem.item.imageUrl}
                alt={raffleItem.item.name}
                width={100}
                height={100}
                className="rounded-md"
              />
              <div>
                <h3 className="font-medium">{raffleItem.item.name}</h3>
                <p className="text-sm text-gray-600">{raffleItem.item.description}</p>
                <p className="font-bold">{raffleItem.ticketPrice}원</p>
              </div>
            </div>
          </section>

          <section className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">주문자 정보</h2>
            <div className="space-y-2">
              <p>홍길동</p>
              <p>010-1111-1111</p>
              <p>xx@xx.com</p>
            </div>
          </section>

          <section className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">배송 정보</h2>
            <ShippingAddressForm onAddressChange={handleAddressChange} />
          </section>
        </div>

        <div className="space-y-4">
          <section className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">최종 결제 내역</h2>
            <div className="space-y-2">
              <p>상품가격: {raffleItem.ticketPrice}원</p>
              <p className="font-bold">총 결제 금액: {raffleItem.ticketPrice}원</p>
            </div>
          </section>

          <section className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">결제하기</h2>
            <div className="flex gap-2">
              <input type="checkbox" className=" text-black py-2 rounded-md" />
              <img src="/image/payment_icon_kakao.svg" alt="카카오페이 결제 아이콘" />
            </div>
          </section>

          <section className="border  rounded-md">
            <div className="space-y-2 p-4">
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>전체동의</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>구매조건 확인 및 결제 진행 동의</span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-400 text-white py-3 font-semibold rounded-bl-md rounded-br-md"
            >
              결제하기
            </button>
          </section>
        </div>
      </form>
    </main>
  );
}
