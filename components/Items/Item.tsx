'use client';

import ItemStyle from './ItemStyle';
import useRaffleData from '../../lib/hooks/useRaffleData';

export default function Item() {
  const { data, isLoading, isError, error, userToken } = useRaffleData();

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
    <>
      {data.map(
        (itemData: {
          currentCount: number;
          totalCount: number;
          item: {
            id: string;
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
            raffleId={itemData.item.id}
          />
        ),
      )}
    </>
  );
}
