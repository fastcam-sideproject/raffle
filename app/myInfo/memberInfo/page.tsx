'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AddressForm from '../../../components/AddressForm';
import PhoneNumber from '../../../components/payment/PhoneNumber';
import useAuthStore from '../../../lib/store/useAuthStore';
import { getMyInfo } from '../../../api/user/myInfo';
import { UserData } from '../../../lib/types/user';
import Button from '../../../lib/common/Button';
import PhoneNumberModal from '../../../components/PhoneNumberModal';
import AddressModal from '../../../components/AddressModal';
import { useAddress } from '../../../lib/hooks/useAddress';

export default function MemberInfoPage() {
  const [isPhoneNumberModalOpen, setIsPhoneNumberModalOpen] = useState<boolean>(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const userToken = useAuthStore((state) => state.userToken);

  const {
    address,
    detailAddress,
    isPostcodeOpen,
    setIsPostcodeOpen,
    handleComplete,
    handleOnChange,
    handleRegisterAddress,
  } = useAddress();
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery<UserData>({
    queryKey: ['getMyInfo'],
    queryFn: () => getMyInfo(userToken),
    enabled: !!userToken,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    throw new Error('회원 정보를 불러오는데 실패했습니다.');
  }

  return (
    <main className="flex flex-col items-center justify-center h-[70vh] p-4 sm:p-8">
      <section className="w-full bg-white p-8 rounded shadow-md  max-w-md sm:max-w-2xl">
        <div className="flex gap-2 justify-center mb-8">
          <img src="/icon/profile.svg" alt="유저의 프로필 아이콘" className="w-4 sm:w-7 h-auto" />
          <h1 className="text-3xl font-bold text-center ">회원 정보</h1>
        </div>
        {userData?.phoneNumber ? (
          <div className="flex gap-2">
            <span className="text-gray-700 font-bold text-lg">전화번호</span>
            <span className="text-lg">{userData?.phoneNumber}</span>
            <Button
              type="button"
              label="수정"
              width="auto"
              fontSize="base"
              onClick={() => setIsPhoneNumberModalOpen(true)}
              className="text-white font-bold bg-primary hover:bg-blue-500"
            />
          </div>
        ) : (
          <PhoneNumber />
        )}
        {userData ? (
          <>
            <div className="flex gap-2">
              <span className="text-gray-700 font-bold text-lg">우편주소</span>
              <span className="text-lg">{userData.address.address}</span>
              <Button
                type="button"
                label="수정"
                width="auto"
                fontSize="base"
                onClick={() => setIsAddressModalOpen(true)}
                className="text-white font-bold bg-primary hover:bg-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <span className="text-gray-700 font-bold text-lg">상세 주소</span>
              <span className="text-lg">{userData.address.detail}</span>
            </div>
          </>
        ) : (
          <AddressForm
            address={address}
            detailAddress={detailAddress}
            isPostcodeOpen={isPostcodeOpen}
            setIsPostcodeOpen={setIsPostcodeOpen}
            handleComplete={handleComplete}
            handleOnChange={handleOnChange}
            handleRegisterAddress={handleRegisterAddress}
          />
        )}
      </section>
      {isPhoneNumberModalOpen && (
        <PhoneNumberModal onClose={() => setIsPhoneNumberModalOpen(false)} />
      )}
      {isAddressModalOpen && <AddressModal onClose={() => setIsAddressModalOpen(false)} />}
    </main>
  );
}
