'use client';

import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { ShippingAddressFormProps } from '../lib/types/shippingAddressForm';
import Button from '../lib/common/Button';

export default function ShippingAddressForm({ onAddressChange }: ShippingAddressFormProps) {
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
      <label htmlFor="address">주소</label>
      <div className="flex items-center gap-2">
        <input
          id="address"
          type="text"
          value={address}
          className="w-10/12 p-2 border rounded
          focus:outline-none  focus:border-blue-600"
          placeholder="주소"
          readOnly={true}
        />
        <Button
          label="우편번호 찾기"
          onClick={() => setIsPostcodeOpen(true)}
          width="auto"
          fontSize="base"
          className="hover:bg-blue-500"
        />
      </div>
      <div>
        <label htmlFor="detailAddress">상세 주소</label>
        <input
          id="detailAddress"
          type="text"
          value={detailAddress}
          onChange={handleOnChange}
          placeholder="상세주소"
          className="w-full p-2 border rounded"
        />
      </div>
      {isPostcodeOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-40 overflow-y-auto h-full w-full">
          <div className="relative top-20 w-1/3 h-3/5 mx-auto p-5 shadow-lg border bg-white">
            <button onClick={() => setIsPostcodeOpen(false)}>닫기</button>
            <div className="mt-10">
              <DaumPostcode onComplete={handleComplete} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
