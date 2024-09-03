'use client';

import { FilterProps, ItemData } from '../../lib/types/item';
import useRaffleData from '../../lib/hooks/useRaffleData';
import ErrorPage from '../ErrorPages/ErrorPage';
import ItemStyle from './ItemStyle';

export default function Item({ filter }: FilterProps) {
  const { data, isLoading, isError } = useRaffleData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div className="col-span-4">
        <ErrorPage />
      </div>
    );
  }

  const filteredData = data
    ? data.filter((itemData: ItemData) => {
        switch (filter) {
          case 'ALL':
            return itemData.isFree && itemData.status === 'ACTIVE';
          case 'FREE':
            return itemData.isFree && itemData.status === 'ACTIVE';
          case 'NOT_FREE':
            return !itemData.isFree && itemData.status === 'ACTIVE';
          case 'COMPLETED':
            return itemData.status === 'COMPLETED';
          default:
            return false;
        }
      })
    : [];

  return (
    <>
      {filteredData.map(
        (itemData: {
          winner: string;
          status: string;
          id: number;
          item: { name: string; category: number; imageUrl: string };
          currentCount: number;
          totalCount: number;
        }) => (
          <ItemStyle
            key={itemData.id}
            name={itemData.item.name}
            category={itemData.item.category}
            imageUrl={itemData.item.imageUrl}
            currentCount={itemData.currentCount}
            totalCount={itemData.totalCount}
            raffleId={itemData.id}
            filter={filter}
            status={itemData.status}
            winner={itemData.winner}
          />
        ),
      )}
    </>
  );
}
