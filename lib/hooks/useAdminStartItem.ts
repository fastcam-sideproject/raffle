import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../store/useAuthStore';
import { postAdminRaffleStart } from '../../api/raffle/adminApi';

export default function useAdminStartItem() {
  const userToken = useAuthStore((state) => state.userToken);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (raffleId: number) => postAdminRaffleStart(userToken, raffleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['raffleItems'] });
      alert('아이템이 성공적으로 등록되었습니다.');
    },
    onError: (error: Error) => {
      alert('아이템 등록에 실패했습니다.');
      console.error('아이템 등록 실패:', error);
    },
  });
  return mutation;
}
