'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { postPurchaseTicketOne } from '../../api/raffle/purchaseTicketApi';
import { getTickets } from '../../api/user/ticketsApi';
import { ItemProps } from '../../lib/types/item';
import Button from '../../lib/common/Button';
import ItemComplete from './ItemComplete';
import useAuthStore from '../../lib/store/useAuthStore';
import ItemLoginModal from './ItemLoginModal';
import RaffleItemConfirmationModal from '../Modal/RaffleItemConfirmationModal';
import PhoneNumberModal from '../Modal/PhoneNumberModal';
import AddressModal from '../Modal/AddressModal';
import useMyInfo from '../../lib/hooks/useMyInfo';

export default function ItemStyle({
  name,
  category,
  imageUrl,
  currentCount,
  totalCount,
  raffleId,
  status,
  winner,
  filter,
}: ItemProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isRaffleConfirmationModalOpen, setIsRaffleConfirmationModalOpen] =
    useState<boolean>(false);
  const [isPhoneNumberModalOpen, setIsPhoneNumberModalOpen] = useState<boolean>(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);

  const userToken = useAuthStore<string>((state) => state.userToken);
  const queryClient = useQueryClient();
  const percentageComplete = parseFloat(((currentCount / totalCount) * 100).toFixed(2));

  const { data: userData } = useMyInfo();

  const mutate = useMutation({
    mutationKey: ['purchaseTicket'],
    mutationFn: () => postPurchaseTicketOne(userToken, raffleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTickets'] });
    },
    onError: (error) => {
      alert('응모에 실패했습니다.');
      throw error;
    },
  });

  /**
   * 응모권 데이터를 가져오는 query 함수
   */
  const { data: ticketsCount } = useQuery({
    queryKey: ['getTickets'],
    queryFn: () => getTickets(),
    enabled: !!userToken,
    staleTime: 1000 * 60,
  });

  const handleImageClick = (event: React.MouseEvent) => {
    if (status === 'COMPLETED') {
      event.preventDefault();
      setIsModalOpen(!isModalOpen);
    }
  };

  /**
   * 응모하기 버튼 클릭 시 실행되는 함수
   */
  const handleEnterRaffle = () => {
    if (!userToken) {
      setIsLoginModalOpen(true);
    } else {
      if (!userData) {
        return;
      }
      if (!userData.phoneNumber) {
        setIsPhoneNumberModalOpen(true);
        return;
      } else if (!userData.address.address || !userData.address.detail) {
        setIsAddressModalOpen(true);
        return;
      } else if (typeof ticketsCount === 'number' && ticketsCount > 0) {
        mutate.mutate();
        setIsRaffleConfirmationModalOpen(true);
      } else {
        alert('응모권이 부족합니다.');
      }
    }
  };

  const handleCloseRaffleConfirmationModal = () => {
    if (!userToken) {
      setIsLoginModalOpen(false);
    } else {
      setIsRaffleConfirmationModalOpen(false);
    }
  };

  const handleToPurchase = () => {
    router.push(`/purchase/${raffleId}`);
  };

  return (
    <li
      id={raffleId.toString()}
      className="p-4 w-full flex flex-col gap-4 rounded shadow-custom-light bg-white "
    >
      <Link
        href={{ pathname: `shop/detail/${raffleId}`, query: { filter } }}
        onClick={handleImageClick}
        className="relative group"
      >
        <Image
          priority
          width={400}
          height={400}
          src={imageUrl}
          alt="추첨할 상품 이미지"
          className="w-full h-40 rounded object-contain transition duration-300 group-hover:blur-sm"
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
        <div>
          <span className="text-lg font-semibold">{percentageComplete}%</span>
          <span>{percentageComplete === 100 ? '진행중' : '완료'}</span>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden ">
          <div
            className={`h-full transition-all duration-300 ${
              percentageComplete === 100 ? 'bg-secondary' : 'bg-primary-30'
            }`}
            style={{ width: `${percentageComplete}%` }}
          />
        </div>

        {filter === 'NOT_FREE' ? (
          <Button
            type="button"
            ariaLabel={percentageComplete === 100 ? '결과 확인' : '결제하기'}
            label={percentageComplete === 100 ? '결과 확인' : '결제하기'}
            width="auto"
            fontSize="base"
            className={`mt-2 px-2 py-1 ${
              percentageComplete === 100 ? 'bg-secondary' : 'bg-primary-30'
            } text-white rounded w-full`}
            onClick={percentageComplete !== 100 ? handleToPurchase : handleImageClick}
          />
        ) : (
          <Button
            type="button"
            ariaLabel={percentageComplete === 100 ? '결과 확인' : '응모하기'}
            label={percentageComplete === 100 ? '결과 확인' : '응모하기'}
            width="auto"
            fontSize="base"
            className={`mt-2 px-2 py-1 ${
              percentageComplete === 100 ? 'bg-secondary' : 'bg-primary-30'
            } text-white rounded w-full`}
            onClick={percentageComplete !== 100 ? handleEnterRaffle : handleImageClick}
          />
        )}
      </div>
      {isModalOpen && (
        <ItemComplete onClose={handleImageClick} winner={winner} imageUrl={imageUrl} name={name} />
      )}
      {isLoginModalOpen && <ItemLoginModal onClose={handleCloseRaffleConfirmationModal} />}
      <RaffleItemConfirmationModal
        isOpen={isRaffleConfirmationModalOpen}
        onClose={handleCloseRaffleConfirmationModal}
        itemName={name}
        itemImageUrl={imageUrl}
      />
      {isPhoneNumberModalOpen && (
        <PhoneNumberModal onClose={() => setIsPhoneNumberModalOpen(false)} />
      )}
      {isAddressModalOpen && <AddressModal onClose={() => setIsAddressModalOpen(false)} />}
    </li>
  );
}
