// ItemPopular.tsx
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
      <h1 className="w-full border-solid border-b-2 border-blue-700 text-2xl px-10 py-4 font-semibold">
        인기 래플
      </h1>
      <div className="flex flex-col justify-center items-center bg-[url('/image/background/gift_bg.jpg')] bg-no-repeat bg-left-top bg-cover">
        <ul className="grid grid-cols-5 items-center max-lg:grid-cols-2 max-sm:grid-cols-1 gap-2 p-8 w-[90%]">
          {data?.map((itemData) => (
            <ItemStyle
              key={itemData.id}
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
          ))}
        </ul>
      </div>
    </>
  );
}
