'use client';

import ItemStyle from './ItemStyle';
import useRaffleData from '../../lib/hooks/useRaffleData';
import { FilterProps, ItemData } from '../../lib/types/item';
import NoUserToken from '../ErrorPages/NoUserToken';
import ErrorPage from '../ErrorPages/ErrorPage';
import { useQuery } from '@tanstack/react-query';
import { getRaffleFreeItem, getRaffleNotFreeItem } from '../../api/raffle/raffleApi';
import useAuthStore from '../../lib/store/useAuthStore';

export default function Item({ filter }: FilterProps) {
  const { data, isLoading, isError, error, userToken } = useRaffleData();

  /**
   * 유료 상품 API 호출
   * @param userToken
   */
  // const userToken = useAuthStore((state) => state.userToken);
  // const { data } = useQuery({
  //   queryKey: ['RaffleItemsNotFree'],
  //   queryFn: () => getRaffleNotFreeItem(userToken),
  // });

  /**
   * 무료 상품 API 호출
   * @param userToken
   */
  // const userToken = useAuthStore((state) => state.userToken);
  // const { data } = useQuery({
  //   queryKey: ['RaffleItemsFree'],
  //   queryFn: () => getRaffleFreeItem(userToken),
  // });
  console.log(data);
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
          id: string;
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
            key={itemData.id}
            name={itemData.item.name}
            category={itemData.item.category}
            imageUrl={itemData.item.imageUrl}
            currentCount={itemData.currentCount}
            totalCount={itemData.totalCount}
            raffleId={itemData.id}
            filter={filter}
          />
        ),
      )}
      {/* {data.map((items: any) => (
        <ItemStyle
          key={items.item.id}
          name={items.item.name}
          category={items.item.category}
          imageUrl={items.item.imageUrl}
          currentCount={items.currentCount}
          totalCount={items.totalCount}
          raffleId={items.item.id}
          filter={filter}
        />
      ))} */}
    </>
  );
}
