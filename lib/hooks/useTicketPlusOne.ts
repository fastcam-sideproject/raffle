import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../store/useAuthStore';
import { postTicketsPlusOne } from '../../api/user/ticketsApi';

export default function useTicketPlusOne() {
  const userToken = useAuthStore((state) => state.userToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['postTicketPlusOne'],
    mutationFn: () => postTicketsPlusOne(userToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTickets'] });
      alert('응모권이 추가되었습니다.');
    },
    onError: (error: Error) => {
      alert('응모권 추가 실패');
      console.error(error);
    },
  });
}
