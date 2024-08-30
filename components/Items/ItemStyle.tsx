'use client';

import { ItemProps } from '../../lib/types/item';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../../lib/common/Button';
import RaffleItemConfirmationModal from './RaffleItemConfirmationModal';
import ItemComplete from './ItemComplete';

export default function ItemStyle({
  name,
  category,
  imageUrl,
  currentCount,
  totalCount,
  raffleId,
  status,
  winner,
}: ItemProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRaffleConfirmationModalOpen, setIsRaffleConfirmationModalOpen] =
    useState<boolean>(false);

  const percentageComplete = parseFloat(((currentCount / totalCount) * 100).toFixed(2));
  // const handlePurchasePage = useNavigateToPurchasePage({ raffleId });

  const handleImageClick = (event: React.MouseEvent) => {
    if (status === 'COMPLETED') {
      event.preventDefault();
      setIsModalOpen(!isModalOpen);
    }
  };

  const handleEnterRaffle = () => {
    setIsRaffleConfirmationModalOpen(true);
  };

  const handleCloseRaffleConfirmationModal = () => {
    setIsRaffleConfirmationModalOpen(false);
  };

  return (
    <li id={raffleId} className="p-4 w-full flex flex-col gap-4 rounded shadow-custom-light">
      <Link href={`shop/detail/${raffleId}`} onClick={handleImageClick} className="relative group">
        <Image
          priority
          width={400}
          height={400}
          src={imageUrl}
          alt="추첨할 상품 이미지"
          className="w-full h-80 rounded object-contain transition duration-300 group-hover:blur-sm"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded opacity-0 group-hover:opacity-100 transition duration-300">
          <span className="text-white text-lg font-semibold">상세보기</span>
        </div>
      </Link>
      <div className="bg-gray-50 p-4 w-full rounded">
        <div>
          <h4 className="text-lg font-bold">{name}</h4>
          <span className="text-gray-400">카테고리{category}</span>
        </div>
        <Button
          type="button"
          ariaLabel={percentageComplete === 100 ? '결과 확인' : '응모하기'}
          label={percentageComplete === 100 ? '결과 확인' : '응모하기'}
          width="auto"
          fontSize="base"
          className={`mt-2 px-2 py-1 ${
            percentageComplete === 100 ? 'bg-secondary' : 'bg-primary'
          } text-white rounded float-right max-md:float-none max-md:w-full`}
          onClick={percentageComplete !== 100 ? handleEnterRaffle : handleImageClick}
        />

        <div>
          <span className="text-lg font-semibold">{percentageComplete}%</span>
          <span>{percentageComplete === 100 ? '진행중' : '완료'}</span>
        </div>
        <div className="mt-6 w-full bg-gray-300 rounded-full h-3 overflow-hidden ">
          <div
            className={`h-full transition-all duration-300 ${
              percentageComplete === 100 ? 'bg-secondary' : 'bg-primary'
            }`}
            style={{ width: `${percentageComplete}%` }}
          />
        </div>
      </div>
      {isModalOpen && (
        <ItemComplete onClose={handleImageClick} winner={winner} imageUrl={imageUrl} name={name} />
      )}
      <RaffleItemConfirmationModal
        isOpen={isRaffleConfirmationModalOpen}
        onClose={handleCloseRaffleConfirmationModal}
        itemName={name}
        itemImageUrl={imageUrl}
        itemId={raffleId}
      />
    </li>
  );
}
