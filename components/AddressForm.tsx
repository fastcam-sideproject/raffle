import React from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import Button from '../lib/common/Button';
import Input from '../lib/common/Input';
import { DaumPostcodeAddress } from '../lib/types/purchase';

type AddressFormProps = {
  address: string;
  detailAddress: string;
  isPostcodeOpen: boolean;
  setIsPostcodeOpen: (value: boolean) => void;
  handleComplete: (data: DaumPostcodeAddress) => void;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegisterAddress: () => void;
};

export function AddressForm({
  address,
  detailAddress,
  isPostcodeOpen,
  setIsPostcodeOpen,
  handleComplete,
  handleOnChange,
  handleRegisterAddress,
}: AddressFormProps) {
  return (
    <>
      <label htmlFor="address" className="text-gray-700 font-bold text-base">
        우편주소
      </label>
      <div className="flex gap-2 pb-2">
        <Input
          type="text"
          value={address}
          name="address"
          placeholder="우편주소를 입력하세요"
          width="9/12"
          fontSize="base"
          disabled={true}
          className="focus:outline-none focus:border-primary"
        />
        <Button
          type="button"
          label="우편번호 찾기"
          onClick={() => setIsPostcodeOpen(true)}
          width="auto"
          fontSize="base"
          className="text-white font-bold bg-gray-400 hover:bg-gray-500"
        />
      </div>
      <label htmlFor="detailAddress" className="text-gray-700 font-bold text-base">
        상세 주소
      </label>
      <div className="flex gap-2 pb-2">
        <Input
          type="text"
          value={detailAddress}
          onChange={handleOnChange}
          name="detailAddress"
          placeholder="상세 주소를 입력하세요"
          width="9/12"
          fontSize="base"
          className="focus:outline-none focus:border-primary"
        />
        <Button
          type="button"
          label="배송주소 등록"
          onClick={handleRegisterAddress}
          width="auto"
          fontSize="base"
          className="text-white font-bold bg-primary hover:bg-blue-500"
        />
      </div>
      {isPostcodeOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-40 overflow-y-auto h-full w-full">
          <div className="relative top-20 w-1/3 h-3/5 mx-auto p-5 shadow-lg border bg-white">
            <button className="absolute top-2 right-2" onClick={() => setIsPostcodeOpen(false)}>
              닫기
            </button>
            <div className="mt-10">
              <DaumPostcodeEmbed onComplete={handleComplete} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddressForm;
