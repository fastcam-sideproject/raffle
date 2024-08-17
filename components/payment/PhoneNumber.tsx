import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import useAuthStore from '../../lib/store/useAuthStore';
import Button from '../../lib/common/Button';
import Input from '../../lib/common/Input';
import { postPhoneNumber } from '../../api/user/phoneNumberApi';

export default function PhoneNumber() {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const useToken = useAuthStore((state) => state.userToken);

  const mutation = useMutation({
    mutationKey: ['phoneNumber'],
    mutationFn: () => postPhoneNumber({ phoneNumber, useToken }),
    onSuccess: () => {
      setIsRegistered(true);
      alert('전화번호 등록 성공');
    },

    onError: (error) => {
      console.error('전화번호 등록 실패', error);
    },
  });

  /**
   *  전화번호 입력값 변경 시 실행되는 함수
   * @param event
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handleRegisterPhoneNumber = () => {
    if (!/^\d{3}-\d{3,4}-\d{4}$/.test(phoneNumber)) {
      alert('-를 포함한 전화번호를 입력해주세요');
      return;
    }
    mutation.mutate();
  };

  return (
    <div className="flex items-center gap-3">
      <Input
        type="text"
        label="전화번호"
        value={phoneNumber}
        onChange={handleChange}
        name="phoneNumber"
        placeholder="010-1234-5678"
        width="10/12"
        fontSize="base"
        disabled={isRegistered}
        className="focus:outline-none focus:border-primary"
      />
      <Button
        type="button"
        label="전화번호 등록"
        width="auto"
        fontSize="base"
        onClick={handleRegisterPhoneNumber}
        disabled={isRegistered}
        className="bg-primary hover:bg-blue-500"
      />
    </div>
  );
}
