'use client';

import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { getRaffleDataDetail } from '../../api/raffle/raffleApi';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '../../lib/common/Button';
import RaffleItemConfirmationModal from './RaffleItemConfirmationModal';

type DeatilData = {
  item: {
    name: string;
    imageUrl: string;
    imageList: { id: string | null | undefined; imageUrl: string | StaticImport }[];
  };
  totalCount: number;
  currentCount: number;
};

export default function ItemDetail({ params: { id } }: { params: { id: string } }) {
  const [detailData, setDetailData] = useState<DeatilData>({
    item: {
      name: '',
      imageUrl: '',
      imageList: [],
    },
    totalCount: 0,
    currentCount: 0,
  });
  const [isRaffleConfirmationModalOpen, setIsRaffleConfirmationModalOpen] =
    useState<boolean>(false);

  const fetchGetRaffleDataDetail = async (id: string) => {
    try {
      const data = await getRaffleDataDetail(id);
      setDetailData(data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchGetRaffleDataDetail(id);
  }, [id]);

  const handleOpenModal = () => {
    setIsRaffleConfirmationModalOpen(true);
  };
  const handleOpenClose = () => {
    setIsRaffleConfirmationModalOpen(false);
  };

  /**
   * 응모 성공 후 데이터를 다시 가져오는 함수
   * @returns void
   */
  const handlePurchaseSuccess = () => {
    fetchGetRaffleDataDetail(id);
  };

  const percentageComplete = ((detailData.currentCount / detailData.totalCount) * 100).toFixed(2);

  if (!detailData) {
    return <div>loading...</div>;
  }

  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="hidden">상세페이지</h1>
      <div className="w-[100%] flex flex-col sm:w-[75%] sm:grid sm:grid-cols-2 justify-between gap-8 items-center p-8">
        <Image
          width={400}
          height={400}
          src={detailData.item.imageUrl}
          alt={detailData.item.name}
          className="object-contain"
        />
        <div className="w-[100%] flex flex-col gap-4">
          <h2 className="font-semibold text-[1.2rem]">{detailData.item.name}</h2>
          <div className="border-solid border-[1px] border-primary p-4">
            <div>채워야 하는 티켓 수 : {detailData.totalCount}</div>
            <div>채워진 티켓 수 : {detailData.currentCount}</div>
            <div>완료율 : {percentageComplete}%</div>
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
          <Button
            type="button"
            ariaLabel="응모하기"
            label="응모하기"
            fontSize="base"
            width="auto"
            onClick={handleOpenModal}
            className="w-full bg-primary hover:bg-blue-500 sm:relative sticky top-0"
          />
        </div>
      </div>
      <RaffleItemConfirmationModal
        isOpen={isRaffleConfirmationModalOpen}
        onClose={handleOpenClose}
        itemName={detailData.item.name}
        itemImageUrl={detailData.item.imageUrl}
        itemId={id}
        onPurchaseSuccess={handlePurchaseSuccess}
      />
      {detailData.item.imageList.map(
        (image: { id: string | null | undefined; imageUrl: string | StaticImport }) => (
          <Image
            key={image.id}
            width={2000}
            height={200}
            src={image.imageUrl}
            alt={`${detailData.item.name} image ${image.id}`}
            className="w-[100%] sm:w-[70%] h-auto mb-10"
          />
        ),
      )}
    </section>
  );
}
