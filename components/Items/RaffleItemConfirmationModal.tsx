import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postPurchaseTicketOne } from '../../api/raffle/purchaseTicketApi';
import { getTickets } from '../../api/user/ticketsApi';
import { useState } from 'react';
import Image from 'next/image';
import Button from '../../lib/common/Button';
import useAuthStore from '../../lib/store/useAuthStore';

type RaffleItemConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemImageUrl: string;
  itemId: string;
};

export default function RaffleItemConfirmationModal({
  isOpen,
  onClose,
  itemName,
  itemImageUrl,
  itemId,
}: RaffleItemConfirmationModalProps) {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const userToken = useAuthStore((state) => state.userToken);
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationKey: ['purchaseTicket'],
    mutationFn: () => postPurchaseTicketOne(userToken, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTickets'] });
      alert('응모가 완료되었습니다.');
    },
    onError: (error) => {
      alert('응모에 실패했습니다.');
      throw error;
    },
  });

  const { data: ticketsCount } = useQuery({
    queryKey: ['getTickets'],
    queryFn: () => getTickets(userToken),
    enabled: !!userToken,
  });

  const handlePurchaseTicket = () => {
    if (ticketsCount > 0) {
      mutate.mutate();
      onClose();
    } else {
      alert('응모권이 부족합니다.');
      setIsDisabled(true);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="w-[90%] max-h-[90%] sm:w-[75%] md:w-[60%] lg:w-[45%] flex flex-col items-center bg-white rounded shadow-lg">
        <div className="w-full rounded-t bg-primary text-white flex justify-center p-6">
          <h2 className="text-2xl font-semibold">{itemName} 응모하기</h2>
        </div>
        <div className="flex flex-col p-6 gap-6">
          <Image
            priority
            src={itemImageUrl}
            alt={`${itemName} 이미지`}
            width={400}
            height={400}
            className="w-full h-60"
          />
          <h3 className="font-semibold text-center text-xl">{itemName}</h3>
        </div>
        <div className="pb-6 flex flex-col sm:flex-row gap-4 sm:gap-20">
          <Button
            className="bg-primary hover:bg-blue-500 px-8 py-3"
            onClick={handlePurchaseTicket}
            label="확인"
            type="button"
            ariaLabel="확인"
            fontSize="base"
            width="auto"
            disabled={isDisabled}
          />
          <Button
            className="bg-gray-300 hover:bg-gray-400 px-8 py-3"
            onClick={onClose}
            label="닫기"
            type="button"
            ariaLabel="닫기"
            fontSize="base"
            width="auto"
          />
        </div>
      </div>
    </div>
  );
}
