'use client';

import { useState } from 'react';
import AddressForm from '../../../components/AddressForm';
import PhoneNumber from '../../../components/payment/PhoneNumber';
import useOrdererInfo from '../../../lib/hooks/useOrdererInfo';
import { useMutation } from '@tanstack/react-query';
import { DaumPostcodeAddress, PurchaseAddress } from '../../../lib/types/purchase';
import { postAddress } from '../../../api/user/addressApi';
import useAuthStore from '../../../lib/store/useAuthStore';

export default function MemberInfoPage() {
  const [address, setAddress] = useState<string>('');
  const [detailAddress, setDetailAddress] = useState<string>('');
  const [isPostcodeOpen, setIsPostcodeOpen] = useState<boolean>(false);
  const [daumAddress, setDaumAddress] = useState({
    address: '',
    addressEnglish: '',
    bname: '',
    jibunAddress: '',
    jibunAddressEnglish: '',
    roadAddress: '',
    sido: '',
    sigungu: '',
    query: '',
  });

  const userToken = useAuthStore((state) => state.userToken);

  console.log(address);

  const mutation = useMutation({
    mutationKey: ['postAddress'],
    mutationFn: (addressData: PurchaseAddress) => postAddress(addressData, userToken),
    onSuccess: () => {
      alert('주소 등록 성공');
    },
    onError: (error: Error) => {
      alert('주소 등록 실패');
      throw error;
    },
  });

  /**
   * 우편번호 찾기 버튼 클릭시 실행되는 카카오 우편번호 API
   * @param data
   */
  const handleComplete = (data: DaumPostcodeAddress) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddress(fullAddress);
    setDaumAddress({
      address: data.address,
      addressEnglish: data.addressEnglish,
      bname: data.bname,
      jibunAddress: data.jibunAddress,
      jibunAddressEnglish: data.jibunAddressEnglish,
      roadAddress: data.roadAddress,
      sido: data.sido,
      sigungu: data.sigungu,
      query: data.query,
    });
    setIsPostcodeOpen(false);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(event.target.value);
  };

  const handleRegisterAddress = () => {
    if (address === '' || detailAddress === '') {
      alert('주소를 입력해주세요');
      return;
    }
    const addressData: PurchaseAddress = {
      address: daumAddress.address,
      addressEnglish: daumAddress.addressEnglish,
      bname: daumAddress.bname,
      jibunAddress: daumAddress.jibunAddress,
      jibunAddressEnglish: daumAddress.jibunAddressEnglish,
      roadAddress: daumAddress.roadAddress,
      sido: daumAddress.sido,
      sigungu: daumAddress.sigungu,
      detail: detailAddress,
      postalCode: daumAddress.query,
      country: 'KR',
      isDefault: true,
    };
    mutation.mutate(addressData);
  };

  const { data, isLoading, isError } = useOrdererInfo();

  if (isLoading) {
    return <p>로딩 중입니다.</p>;
  }

  if (isError) {
    throw new Error('주문자 정보를 불러오는데 실패했습니다.');
  }

  return (
    <main className="flex flex-col items-center justify-center h-[70vh] p-4 sm:p-8">
      <section className="w-full bg-white p-8 rounded shadow-md  max-w-md sm:max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">회원 정보</h1>
        {data.phoneNumber ? <p>{data.phoneNumber}</p> : <PhoneNumber />}
        {address && detailAddress ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">주소</h2>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <span className="text-gray-700 font-bold text-base">우편주소</span>
                <span className="text-base">{address}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-700 font-bold text-base">상세 주소</span>
                <span className="text-base">{detailAddress}</span>
              </div>
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
    </main>
  );
}
