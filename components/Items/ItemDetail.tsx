'use client';

import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { getNotFreeRaffleDataDetail, getRaffleDataDetail } from '../../api/raffle/raffleApi';
import { postPurchaseTicketOne } from '../../api/raffle/purchaseTicketApi';
import { getTickets } from '../../api/user/ticketsApi';
import { DeatilItem } from '../../lib/types/item';
import Button from '../../lib/common/Button';
import useAuthStore from '../../lib/store/useAuthStore';
import ItemLoginModal from './ItemLoginModal';
import RaffleItemConfirmationModal from '../Modal/RaffleItemConfirmationModal';

export default function ItemDetail({ params: { id } }: { params: { id: number } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || 'ALL'; // 기본값 'ALL' 설정
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [detailData, setDetailData] = useState<DeatilItem>({
    item: {
      name: '',
      imageUrl: '',
      imageList: [],
    },
    totalCount: 0,
    currentCount: 0,
    ticketPrice: 0,
  });
  const [isRaffleConfirmationModalOpen, setIsRaffleConfirmationModalOpen] =
    useState<boolean>(false);

  const userToken = useAuthStore((state) => state.userToken);
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationKey: ['purchaseTicket'],
    mutationFn: () => postPurchaseTicketOne(userToken, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTickets'] });
      handlePurchaseSuccess();
      setIsRaffleConfirmationModalOpen(true);
    },
    onError: (error) => {
      alert('응모에 실패했습니다.');
      throw error;
    },
  });

  const { data: ticketsCount } = useQuery({
    queryKey: ['getTickets'],
    queryFn: () => getTickets(),
    enabled: !!userToken,
  });

  /**
   * 래플 데이터 가져오는 함수
   */
  const fetchGetRaffleDataDetail = async (id: number): Promise<void> => {
    try {
      const data =
        filter === 'NOT_FREE'
          ? await getNotFreeRaffleDataDetail(id)
          : await getRaffleDataDetail(id);
      if (!data.item.imageUrl) {
        data.item.imageUrl = null;
      }
      setDetailData(data);
    } catch (error) {
      console.error('Failed to fetch raffle data:', error);
    }
  };

  useEffect(() => {
    fetchGetRaffleDataDetail(id);
  }, [id]);

  const handleEnterRaffle = () => {
    if (!userToken) {
      setIsLoginModalOpen(true);
    } else {
      if (ticketsCount !== undefined && ticketsCount > 0) {
        mutate.mutate();
      } else {
        alert('응모권이 부족합니다.');
      }
    }
  };

  const handleOpenClose = () => {
    if (!userToken) {
      setIsLoginModalOpen(false);
    } else {
      setIsRaffleConfirmationModalOpen(false);
    }
  };

  /**
   * 응모 성공 후 데이터를 다시 가져오는 함수
   */
  const handlePurchaseSuccess = () => {
    fetchGetRaffleDataDetail(id);
  };

  const handleToPurchase = () => {
    router.push(`/purchase/${id}`);
  };

  const percentageComplete = ((detailData.currentCount / detailData.totalCount) * 100).toFixed(2);

  if (!detailData) {
    return <div>loading...</div>;
  }

  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="hidden">상세페이지</h1>
      <div className="w-[100%] flex flex-col sm:w-[75%] sm:grid sm:grid-cols-2 justify-between gap-8 items-center p-8">
        {detailData.item.imageUrl ? (
          <Image
            width={400}
            height={400}
            src={detailData.item.imageUrl}
            alt={`${detailData.item.name} 이미지`}
            className="object-contain"
          />
        ) : (
          <div className="text-gray-500 text-lg">이미지 준비중</div>
        )}
        <div className="w-[100%] flex flex-col gap-4">
          <h2 className="font-semibold text-[1.2rem]">{detailData.item.name}</h2>
          <div className="border-solid border-[1px] border-primary p-4">
            <div>채워야 하는 티켓 수 : {detailData.totalCount}</div>
            <div>채워진 티켓 수 : {detailData.currentCount}</div>
            <div>완료율 : {percentageComplete}%</div>
            {filter === 'NOT_FREE' ? <div>티켓가격 : {detailData.ticketPrice}원</div> : ''}
            <div className="mt-6 w-full bg-gray-300 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  percentageComplete === '100' ? 'bg-secondary' : 'bg-primary'
                }`}
                style={{ width: `${percentageComplete}%` }}
              />
            </div>
          </div>
          <div />
          {filter === 'NOT_FREE' ? (
            <Button
              type="button"
              ariaLabel="결제하기"
              label="결제하기"
              width="auto"
              fontSize="base"
              onClick={handleToPurchase}
              className="w-full text-white font-bold bg-primary hover:bg-blue-500 sm:relative sticky top-0"
            />
          ) : (
            <Button
              type="button"
              ariaLabel="응모하기"
              label="응모하기"
              fontSize="base"
              width="auto"
              onClick={handleEnterRaffle}
              className="w-full text-white font-bold bg-primary hover:bg-blue-500 sm:relative sticky top-0"
            />
          )}
        </div>
      </div>
      <RaffleItemConfirmationModal
        isOpen={isRaffleConfirmationModalOpen}
        onClose={handleOpenClose}
        itemName={detailData.item.name}
        itemImageUrl={detailData.item.imageUrl}
        type="raffle"
      />
      {detailData.item.imageList.length > 0 ? (
        detailData.item.imageList.map(
          (image: { id: string | null | undefined; imageUrl: string | StaticImport }) =>
            image.imageUrl ? (
              <Image
                key={image.id}
                width={2000}
                height={200}
                src={image.imageUrl}
                alt={`${detailData.item.name} image ${image.id}`}
                className="w-[100%] sm:w-[70%] h-auto mb-10"
              />
            ) : (
              <div key={image.id || Math.random()} className="text-gray-500 text-lg">
                이미지 준비중
              </div>
            ),
        )
      ) : (
        <div className="text-gray-500 text-lg">이미지 준비중</div>
      )}
      {isLoginModalOpen && <ItemLoginModal onClose={handleOpenClose} />}
    </section>
  );
}
