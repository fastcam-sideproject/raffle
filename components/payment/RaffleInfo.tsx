import { useEffect, useState } from 'react';
import { RaffleItem } from '../../lib/types/item';
import useRaffleData from '../../lib/hooks/useRaffleData';
import Image from 'next/image';

export default function RaffleInfo({ id }: { id: string }) {
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
      <h2 className="text-xl font-semibold mb-4">응모 상품 정보</h2>
      <div className="flex space-x-4 gap-4">
        <Image
          src={raffleItem.item.imageUrl}
          alt={raffleItem.item.name}
          width={150}
          height={150}
          className="rounded-md"
        />
        <div>
          <h3 className="font-medium">{raffleItem.item.name}</h3>
          <p className="text-sm text-gray-600">{raffleItem.item.description}</p>
          <p className="font-bold">{raffleItem.ticketPrice}원</p>
        </div>
      </div>
    </section>
  );
}
