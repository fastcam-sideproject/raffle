import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../store/useAuthStore';
import { postAdminRaffleStop } from '../../api/raffle/adminApi';

export default function useAdminStopItem() {
  const userToken = useAuthStore((state) => state.userToken);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (raffleId: number) => postAdminRaffleStop(userToken, raffleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['raffleItems'] });
      alert('아이템이 성공적으로 정지 되었습니다.');
    },
    onError: (error: Error) => {
      alert('아이템 정지에 실패했습니다.');
      console.error('아이템 정지 실패:', error);
    },
  });
  return mutation;
}
