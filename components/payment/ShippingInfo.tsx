import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { postAddress } from '../../api/user/addressApi';
import { PurchaseAddress, DaumPostcodeAddress, ShippingInfoProp } from '../../lib/types/purchase';
import useAuthStore from '../../lib/store/useAuthStore';
import AddressForm from '../AddressForm';
import useMyInfo from '../../lib/hooks/useMyInfo';

export default function ShippingInfo({ onAddressChange }: ShippingInfoProp) {
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

  const mutation = useMutation({
    mutationKey: ['postAddress'],
    mutationFn: (addressData: PurchaseAddress) => postAddress(addressData, userToken),
    onSuccess: () => {
      alert('주소 등록 성공');
    },
    onError: (error: Error) => {
      alert('주소 등록 실패');
      console.error('주소 등록 실패', error);
    },
  });

  const { data, isLoading, error } = useMyInfo();

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
    onAddressChange(`${fullAddress} ${detailAddress}`);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(event.target.value);
    onAddressChange(`${address} ${detailAddress}`);
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

  if (isLoading) {
    return <p>배송 정보를 불러오는 중입니다.</p>;
  }
  if (!data) {
    return <p>배송 정보가 없습니다.</p>;
  }
  if (error) {
    return <p>배송 정보를 불러오는데 실패했습니다.</p>;
  }

  return (
    <section className="border p-4 rounded-md">
      <h2 className="text-2xl font-semibold mb-4">배송 정보</h2>
      {data?.address?.address ? (
        <div className="space-y-1 text-lg">
          <p>{data.name}</p>
          <p>{data.phoneNumber}</p>
          <p>{data.address.address}</p>
          <p>{data.address.detail}</p>
          <p>{data.address.postalCode}</p>
        </div>
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
  );
}
