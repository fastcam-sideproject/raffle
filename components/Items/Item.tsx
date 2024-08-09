'use client';

import { useQuery } from '@tanstack/react-query';
import { Key } from 'react';
import ItemStyle from './ItemStyle';
import { useAuthStore } from '../../lib/store/useAuthStore';
import { fetchRaffleData } from '../../api/api';

export default function Item() {
  const userToken = useAuthStore((state) => state.userToken);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['shopItems', userToken],
    queryFn: fetchRaffleData,
    enabled: !!userToken,
    staleTime: 1000 * 60 * 5,
  });

  if (!userToken) {
    return <div>로그인이 필요합니다</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        Error loading data <span>{error.toString()}</span>
      </div>
    );
  }
  return (
    <div>
      {data.map(
        (itemData: {
          currentCount: number;
          totalCount: number;
          item: {
            id: Key;
            name: string;
            category: number;
            imageUrl: string;
          };
        }) => (
          <ItemStyle
            key={itemData.item.id}
            name={itemData.item.name}
            category={itemData.item.category}
            imageUrl={itemData.item.imageUrl}
            currentCount={itemData.currentCount}
            totalCount={itemData.totalCount}
          />
        ),
      )}
    </div>
  );
}
