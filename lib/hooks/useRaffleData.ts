import { useQuery } from '@tanstack/react-query';
import { getRaffleData } from '../../api/raffle/raffleApi';
import useAuthStore from '../store/useAuthStore';

export default function useRaffleData() {
  const userToken = useAuthStore((state) => state.userToken);

  const queryResult = useQuery({
    queryKey: ['RaffleItems', userToken],
    queryFn: getRaffleData,
    enabled: !!userToken,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...queryResult,
    userToken,
  };
}
