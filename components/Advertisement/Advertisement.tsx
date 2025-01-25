'use client';

import { useEffect, useState } from 'react';
import useTicketPlusOne from '@/lib/hooks/useTicketPlusOne';
import { KakaoAdFit } from '../KakaoAdFit';
import Button from '../../lib/common/Button';
import { AdvertisementProps } from '../../lib/types/advertisement';

export default function Advertisement({ onClose }: AdvertisementProps) {
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(3);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  const { mutate } = useTicketPlusOne();

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
      mutate();
      setIsToggle(!isToggle);
      onClose();
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
