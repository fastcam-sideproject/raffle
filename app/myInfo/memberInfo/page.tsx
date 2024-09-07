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
    <main className="flex flex-col items-center justify-center h-[40rem] p-4 sm:p-8">
      <section className="w-full bg-white p-8 rounded shadow-lg max-w-md sm:max-w-xl">
        <div className="flex flex-col items-center mb-4">
          <div className="w-auto h-auto bg-gray-400 rounded-full p-5 mb-5">
            <img
              src="/icon/mypageProfile.svg"
              alt="나의 정보 프로필 아이콘"
              className="w-25 h-25"
            />
          </div>
          <h2 className="text-xl font-semibold">{userData?.name}</h2>
          <div className="flex gap-2">
            <img src="/icon/email.svg" alt="유저의 이메일 아이콘" className="w-4 sm:w-5 h-auto " />
            <p className="text-gray-600 text-sm sm:text-lg">{userData?.email}</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          {userData?.phoneNumber ? (
            <div className="flex flex-col items-start gap-1 w-full">
              <span className="text-gray-700 font-bold  text-base sm:text-lg">전화번호</span>
              <div className="w-full flex justify-between gap-4">
                <span className="text-base sm:text-lg">{userData?.phoneNumber}</span>
                <Button
                  type="button"
                  label="수정"
                  width="auto"
                  fontSize="sm"
                  onClick={() => setIsPhoneNumberModalOpen(true)}
                  className="sm:text-base text-white font-bold bg-primary hover:bg-blue-500"
                />
              </div>
            </div>
          ) : (
            <PhoneNumber />
          )}
          {userData ? (
            <>
              <div className="w-full flex flex-col items-start gap-1 ">
                <span className="text-gray-700 font-bold text-base sm:text-lg">우편주소</span>
                <div className="w-full flex justify-between gap-4">
                  <span className="text-base sm:text-lg">{userData.address.address}</span>
                  <Button
                    type="button"
                    label="수정"
                    width="auto"
                    fontSize="sm"
                    onClick={() => setIsAddressModalOpen(true)}
                    className="sm:text-base text-white font-bold bg-primary hover:bg-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start gap-1 w-full">
                <span className="text-gray-700 font-bold  text-base sm:text-lg">상세 주소</span>
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
        </div>
      </section>
      {isPhoneNumberModalOpen && (
        <PhoneNumberModal onClose={() => setIsPhoneNumberModalOpen(false)} />
      )}
      {isAddressModalOpen && <AddressModal onClose={() => setIsAddressModalOpen(false)} />}
    </main>
  );
}
