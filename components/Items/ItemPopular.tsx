import { useQuery } from '@tanstack/react-query';
import { getPopularRaffleData } from '../../api/raffle/raffleApi';
import ItemStyle from './ItemStyle';
import { PopularItem } from '../../lib/types/item';

export default function ItemPopular() {
  const { data, isLoading, isError, error } = useQuery<PopularItem[]>({
    queryKey: ['RafflePopular'],
    queryFn: () => getPopularRaffleData(),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error: {error instanceof Error ? error.message : error}</p>;

  return (
    <>
      <h1 className="px-8 py-4 font-semibold">인기 래플</h1>
      <ul className="grid grid-cols-5 gap-4 p-8">
        {data?.map((itemData) => (
          <li key={itemData.id}>
            <ItemStyle
              name={itemData.item.name}
              category={itemData.item.category}
              imageUrl={itemData.item.imageUrl}
              currentCount={itemData.currentCount}
              totalCount={itemData.totalCount}
              raffleId={itemData.id}
              status={itemData.status}
              winner={itemData.winner}
              filter={''}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
