'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getRaffleData } from '../../../api/raffle/raffleApi';
import { useAuthStore } from '../../../lib/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

type Item = {
  item: {
    name: string;
    description: string;
    imageUrl: string;
  };
};

export default function PurchasePage() {
  const { id } = useParams<{ id: string }>();
  const [raffleItem, setRaffleItem] = useState<Item>({
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
      const parseId = Array.isArray(id) ? id[0] : id;
      const foundItem = data.find((raffle: { id: number }) => raffle.id === parseInt(parseId));
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
    <div>
      <h1>{raffleItem.item.name} 결제 페이지</h1>
      <p>{raffleItem.item.description}</p>
      <Image
        src={raffleItem.item.imageUrl}
        alt={raffleItem.item.name + '이미지'}
        width={200}
        height={200}
      />
    </div>
  );
}
