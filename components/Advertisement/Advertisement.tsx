'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { KakaoAdFit } from '../KakaoAdFit';
import { postTicketsPlusOne } from '../../api/user/ticketsApi';
import Button from '../../lib/common/Button';
import useAuthStore from '../../lib/store/useAuthStore';
import { AdvertisementProps } from '../../lib/types/advertisement';

export default function Advertisement({ onClose }: AdvertisementProps) {
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(3);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  const userToken = useAuthStore((state) => state.userToken);
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationKey: ['postTicketsPlusOne'],
    mutationFn: () => postTicketsPlusOne(userToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTickets'] });
      alert('티켓 추가 성공');
      onClose();
    },
    onError: (error: Error) => {
      alert('티켓 추가 실패');
      throw error;
    },
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsButtonEnabled(true);
    }
  }, [countdown]);

  const handleCloseButton = () => {
    if (isButtonEnabled) {
      mutate.mutate();
      setIsToggle(!isToggle);
    }
  };

  return (
    <main
      className={`${
        isToggle
          ? 'hidden'
          : 'fixed inset-0 z-50 bg-gray-600 bg-opacity-40 flex items-center justify-center mt-16'
      }`}
    >
      <section className="relative w-auto h-auto flex flex-col items-center bg-white rounded p-6">
        <div className="absolute top-1 right-1">
          {isButtonEnabled ? (
            <Button
              label="리워드 받기"
              className=" text-white font-semibold bg-primary hover:bg-blue-500"
              onClick={handleCloseButton}
              type="button"
              width="auto"
              fontSize="base"
            />
          ) : (
            <div className="bg-primary text-white p-2 rounded-lg">{countdown} 초</div>
          )}
        </div>
        <div className="pt-8">
          <KakaoAdFit unit="DAN-qvc3rvDUKVUobMDZ" width="300" height="250" disabled={false} />
        </div>
      </section>
    </main>
  );
}
