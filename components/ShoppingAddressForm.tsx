'use client';

import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { ShoppingAddressFormProps } from '../lib/types/shoppingAddressForm';
import { Button } from '../lib/common/Button';
import Input from '../lib/common/Input';

export default function ShoppingAddressForm({ onAddressChange }: ShoppingAddressFormProps) {
  const [address, setAddress] = useState<string>('');
  const [detailAddress, setDetailAddress] = useState<string>('');
  const [isPostcodeOpen, setIsPostcodeOpen] = useState<boolean>(false);

  const handleComplete = (data: {
    address: string;
    addressType: string;
    bname: string;
    buildingName: string;
  }) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddress(fullAddress);
    setIsPostcodeOpen(false);
    onAddressChange(fullAddress);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(event.target.value);
    onAddressChange(`${address} ${detailAddress}`);
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <Input
          type="text"
          label="우편번호"
          value={address}
          name="address"
          placeholder="우편번호"
          width="10/12"
          fontSize="base"
          disabled={true}
          className="flex-grow"
        />
        <Button
          type="button"
          label="우편번호 찾기"
          onClick={() => setIsPostcodeOpen(true)}
          width="auto"
          fontSize="base"
          className="hover:bg-blue-500"
        />
      </div>
      <Input
        type="text"
        label="상세 주소"
        value={detailAddress}
        onChange={handleOnChange}
        name="detailAddress"
        placeholder="상세 주소를 입력하세요"
        width="full"
        fontSize="base"
        className="focus:outline-none focus:border-primary"
      />
      {isPostcodeOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-40 overflow-y-auto h-full w-full">
          <div className="relative top-20 w-1/3 h-3/5 mx-auto p-5 shadow-lg border bg-white">
            <button className="absolute top-2 right-2" onClick={() => setIsPostcodeOpen(false)}>
              닫기
            </button>
            <div className="mt-10">
              <DaumPostcode onComplete={handleComplete} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
