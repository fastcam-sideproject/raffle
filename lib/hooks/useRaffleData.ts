import { useQuery } from '@tanstack/react-query';
import { getRaffleData, getRaffleFreeItem, getRaffleNotFreeItem } from '../../api/raffle/raffleApi';
import useAuthStore from '../store/useAuthStore';

export default function useRaffleData(filter = 'ALL') {
  const userToken = useAuthStore((state) => state.userToken);
  const queryKey = ['RaffleItems', userToken, filter];
  const queryResult = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const data = await getRaffleData(userToken);
      // console.log('Fetched Raffle Data:', data);
      // if (filter === 'ALL') {
      //   return data;
      // }

      if (Array.isArray(data) && data.length > 0) {
        const freeItems = data.filter((item) => item.isFree);
        const notFreeItems = data.filter((item) => !item.isFree);

        if (filter === 'FREE') {
          return freeItems.length > 0 ? await getRaffleFreeItem(userToken) : [];
        }

        if (filter === 'NOT_FREE') {
          return notFreeItems.length > 0 ? await getRaffleNotFreeItem(userToken) : [];
        }

        if (filter === 'COMPLETED') {
          return data.filter((item) => item.status === 'COMPLETED');
        }
      }
      return data;
    },

    enabled: !!userToken,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...queryResult,
    userToken,
  };
}
