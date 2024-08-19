'use client';

import ItemStyle from './ItemStyle';
import useRaffleData from '../../lib/hooks/useRaffleData';
import { FilterProps, ItemData } from '../../lib/types/item';
import NoUserToken from '../ErrorPages/NoUserToken';
import ErrorPage from '../ErrorPages/ErrorPage';

export default function Item({ filter }: FilterProps) {
  const { data, isLoading, isError, error, userToken } = useRaffleData();

  const filteredData = data
    ? data.filter((itemData: ItemData) => {
        if (filter === 'ALL') return true;
        return itemData.status === filter;
      })
    : [];

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
    // eslint-disable-next-line no-console
    console.error(error.toString());
    return (
      <div className="col-span-4">
        <ErrorPage />
      </div>
    );
  }

  return (
    <>
      {filteredData.map(
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
            filter={filter}
          />
        ),
      )}
    </>
  );
}
