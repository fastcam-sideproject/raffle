'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import RaffleInfo from '../../../components/payment/RaffleInfo';
import OrdererInfo from '../../../components/payment/OrdererInfo';
import ShippingInfo from '../../../components/payment/ShippingInfo';
import FinalPaymentSummary from '../../../components/payment/FinalPaymentSummary';
import RaffleItemConfirmationModal from '../../../components/Modal/RaffleItemConfirmationModal';
import { getNotFreeRaffleDataDetail } from '../../../api/raffle/raffleApi';
import { postPurchaseItem } from '../../../api/raffle/purchaseItemApi';
import useAuthStore from '../../../lib/store/useAuthStore';

export default function PurchasePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const router = useRouter();

  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [isTermsChecked, setIsTermsChecked] = useState<boolean>(false);
  const [isPurchaseChecked, setIsPurchaseChecked] = useState<boolean>(false);
  const [isRaffleConfirmationModalOpen, setIsRaffleConfirmationModalOpen] =
    useState<boolean>(false);
  const userToken = useAuthStore<string>((state) => state.userToken);

  useEffect(() => {
    if (!userToken) {
      router.push('/');
    }
  }, [userToken, router]);

  const { data: raffleDetailItem } = useQuery({
    queryKey: ['getNotFreeRaffleDataDetail'],
    queryFn: () => getNotFreeRaffleDataDetail(parseInt(id)),
  });

  useEffect(() => {
    setIsAllChecked(isTermsChecked && isPurchaseChecked);
  }, [isTermsChecked, isPurchaseChecked]);

  const mutate = useMutation({
    mutationKey: ['postPurchaseItem'],
    mutationFn: () => postPurchaseItem({ raffleId: parseInt(id), userToken }),
    onSuccess: () => {
      setIsRaffleConfirmationModalOpen(true);
    },
    onError: (error) => {
      alert('응모에 실패했습니다.');
      console.error('응모에 실패했습니다.', error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isAllChecked) {
      mutate.mutate();
    }
  };

  const handleCloseModal = () => {
    setIsRaffleConfirmationModalOpen(false);
    router.push('/shop');
  };

  if (!raffleDetailItem) {
    return <div>로딩 중...</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">상품 결제</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <RaffleInfo id={id} />
          <OrdererInfo />
          <ShippingInfo />
        </div>
        <div className="space-y-4">
          <FinalPaymentSummary id={id} />
          <section className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">결제하기</h2>
            <div className="flex gap-2">
              <input type="checkbox" className=" text-black py-2 rounded-md" />
              <img
                src="/icon/payment_icon_kakao.svg"
                alt="카카오페이 결제 아이콘"
                className="w-20 h-8"
              />
            </div>
          </section>
          <section className="border rounded-md">
            <div className="space-y-2 p-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isTermsChecked}
                  onChange={(event) => setIsTermsChecked(event.target.checked)}
                />
                <span>전체동의</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isPurchaseChecked}
                  onChange={(event) => setIsPurchaseChecked(event.target.checked)}
                />
                <span>구매조건 확인 및 결제 진행 동의</span>
              </label>
            </div>
            <button
              type="submit"
              className={`w-full py-3 font-semibold rounded-bl-md rounded-br-md ${
                isAllChecked
                  ? 'bg-primary hover:bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!isAllChecked}
            >
              결제하기
            </button>
          </section>
        </div>
      </form>
      <RaffleItemConfirmationModal
        isOpen={isRaffleConfirmationModalOpen}
        onClose={handleCloseModal}
        itemName={raffleDetailItem.item.name}
        itemImageUrl={raffleDetailItem.item.imageUrl}
        type="purchase"
      />
    </main>
  );
}
