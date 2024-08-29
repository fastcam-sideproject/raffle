'use client';

import useRaffleData from '../../lib/hooks/useRaffleData';
import NoUserToken from '../ErrorPages/NoUserToken';
import ErrorPage from '../ErrorPages/ErrorPage';
import ItemStyle from './ItemStyle';
import { FilterProps, ItemData } from '../../lib/types/item';

export default function Item({ filter }: FilterProps) {
  const { data, isLoading, isError, error, userToken } = useRaffleData();

  if (!userToken) {
    return (
      <div className="col-span-4">
        <NoUserToken />
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error(error?.toString());
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
            return itemData.status === 'ACTIVE';
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
          status: string;
          id: string;
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
          />
        ),
      )}
    </>
  );
}
