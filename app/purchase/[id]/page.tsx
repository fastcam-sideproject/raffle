'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { RaffleItem } from '../../../lib/types/item';
import useRaffleData from '../../../lib/hooks/useRaffleData';
import Button from '../../../lib/common/Button';
import PhoneNumber from '../../../components/PhoneNumber';
import ShoppingAddressForm from '../../../components/payment/ShoppingAddressForm';
import RaffleInfo from '../../../components/payment/RaffleInfo';

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
  const [address, setAddress] = useState<string>('');
  const { data, isLoading, isError, error } = useRaffleData();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit');
  };

  const handleAddressChange = (address: string) => {
    setAddress(address);
  };

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

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">응모 하기</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <section className="border p-4 rounded-md">
            <RaffleInfo id={id} />
          </section>

          <section className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">주문자 정보</h2>
            <div className="space-y-2">
              <p>홍길동</p>
              <PhoneNumber />
            </div>
          </section>

          <section className="border p-4 rounded-md">
            <div>
              <h2 className="text-xl font-semibold mb-4">배송 정보</h2>
            </div>
            <ShoppingAddressForm onAddressChange={handleAddressChange} />
            <div className="flex justify-center">
              <Button
                type="button"
                label="등록"
                onClick={() => console.log('주소 등록')}
                width="auto"
                fontSize="base"
                className="bg-primary text-white  rounded"
              />
            </div>
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
              className="w-full bg-primary text-white py-3 font-semibold rounded-bl-md rounded-br-md"
            >
              결제하기
            </button>
          </section>
        </div>
      </form>
    </main>
  );
}
