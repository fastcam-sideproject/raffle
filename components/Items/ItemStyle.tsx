'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ItemProps } from '../../lib/types/item';
import navigateToPurchasePage from '../../lib/utils/navigateToPurchasePage';
import Button from '../../lib/common/Button';
import { useState } from 'react';

export default function ItemStyle({
  name,
  category,
  imageUrl,
  currentCount,
  totalCount,
  raffleId,
  status,
}: ItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const percentageComplete = parseFloat(((currentCount / totalCount) * 100).toFixed(2));
  const handlePurchasePage = navigateToPurchasePage({ raffleId });

  const handleImageClick = (event: React.MouseEvent) => {
    if (status === 'COMPLETED') {
      event.preventDefault();
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          width=""
          fontSize=""
          className={`mt-2 px-2 py-1 ${
            percentageComplete === 100 ? 'bg-secondary' : 'bg-primary'
          } text-white rounded float-right max-md:float-none max-md:w-full`}
          onClick={percentageComplete !== 100 ? handlePurchasePage : handleImageClick}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-center">이벤트가 종료되었습니다.</h2>
            <p className="text-center">
              해당 이벤트는 이미 완료되었습니다. <br />
              다음 기회에 도전해보세요!
            </p>
            <button className="mt-4 px-4 py-2 bg-primary text-white rounded" onClick={closeModal}>
              닫기
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
