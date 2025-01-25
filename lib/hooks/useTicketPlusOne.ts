import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTicketsPlusOne } from '../../api/user/ticketsApi';

export default function useTicketPlusOne() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['postTicketPlusOne'],
    mutationFn: postTicketsPlusOne,
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
