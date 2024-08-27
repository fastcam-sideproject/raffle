import React, { useEffect, useState } from 'react';
import { RaffleItem } from '../../lib/types/item';
import useRaffleData from '../../lib/hooks/useRaffleData';

export default function FinalPaymentSummary({ id }: { id: string }) {
  const [raffleItem, setRaffleItem] = useState<RaffleItem>({
    ticketPrice: 0,
    item: {
      name: '',
      description: '',
      imageUrl: '',
    },
  });

  const { data, isLoading, isError, error } = useRaffleData();

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
    <section className="border p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-4">최종 결제 내역</h2>
      <div className="space-y-2">
        <p>상품가격: {raffleItem.ticketPrice}원</p>
        <p className="font-bold">총 결제 금액: {raffleItem.ticketPrice}원</p>
      </div>
    </section>
  );
}
