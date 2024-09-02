'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTicketsPlusOne } from '../../api/user/ticketsApi';
import useAuthStore from '../../lib/store/useAuthStore';
import Button from '../../lib/common/Button';

export default function TicketPlusOneButton() {
  const userToken = useAuthStore((state) => state.userToken);
  const queryClient = useQueryClient();

  /**
   * 티켓 추가하는 useMutation
   * queryClient.invalidateQueries: 티켓 추가 성공시 getTickets 쿼리를 다시 요청
   */
  const mutate = useMutation({
    mutationKey: ['postTicketsPlusOne'],
    mutationFn: () => postTicketsPlusOne(userToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTickets'] });
      alert('티켓 추가 성공');
    },
    onError: (error: Error) => {
      alert('티켓 추가 실패');
      console.error('티켓 추가 실패', error);
    },
  });

  const handleOnClick = () => {
    mutate.mutate();
  };

  return (
    <>
      <Button
        type="button"
        label="광고 보고 응모권 추가하기"
        width="auto"
        fontSize="base"
        className="bg-primary hover:bg-blue-500"
        onClick={handleOnClick}
      />
    </>
  );
}
