import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../store/useAuthStore';
import { deleteAdminRaffleItem } from '../../api/raffle/adminApi';

export default function useAdminDeleteItem() {
  const userToken = useAuthStore((state) => state.userToken);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (raffleId: number) => deleteAdminRaffleItem(userToken, raffleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['raffleItems'] });
      alert('아이템이 성공적으로 삭제되었습니다.');
    },
    onError: (error: Error) => {
      alert('아이템 삭제에 실패했습니다.');
      console.error('아이템 삭제 실패:', error);
    },
  });

  return mutation;
}
