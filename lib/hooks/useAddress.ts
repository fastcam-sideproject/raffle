import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../store/useAuthStore';
import { DaumPostcodeAddress, PurchaseAddress } from '../types/purchase';
import { postAddress } from '../../api/user/addressApi';

/**
 * @description 우편주소 데이터를 처리하는 커스텀 훅
 * @returns {string} address
 * @returns {string} detailAddress
 * @returns {boolean} isPostcodeOpen
 * @returns {DaumPostcodeAddress} daumAddress
 * @returns {function} setIsPostcodeOpen
 * @returns {function} handleComplete
 * @returns {function} handleOnChange
 * @returns {function} handleRegisterAddress
 */
export default function useAddress() {
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
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['postAddress'],
    mutationFn: (addressData: PurchaseAddress) => postAddress(addressData, userToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getMyInfo'],
      });
      alert('주소 등록 성공');
    },
    onError: (error: Error) => {
      alert('주소 등록 실패');
      throw error;
    },
  });

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

  return {
    address,
    detailAddress,
    isPostcodeOpen,
    daumAddress,
    setIsPostcodeOpen,
    handleComplete,
    handleOnChange,
    handleRegisterAddress,
  };
}
