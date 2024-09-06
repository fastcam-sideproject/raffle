import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import useAuthStore from '../../lib/store/useAuthStore';
import Button from '../../lib/common/Button';
import Input from '../../lib/common/Input';
import { postPhoneNumber, postVerifyPhone } from '../../api/user/phoneNumberApi';

export default function PhoneNumber() {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const verifyPhoneNumberMutation = useMutation({
    mutationKey: ['verifyPhoneNumber'],
    mutationFn: () => postVerifyPhone({ phoneNumber }),
    onSuccess: (data) => {
      setSecretKey(data.secretKey);
      alert('인증번호가 발송되었습니다.');
    },
    onError: (error) => {
      console.error('휴대폰 인증번호 요청 실패', error);
    },
  });

  const checkVerificationCode = () => {
    if (!phoneNumber) {
      alert('전화번호를 입력해주세요');
      return;
    } else if (!verificationCode) {
      alert('인증번호를 입력해주세요');
      return;
    }

    if (verificationCode === secretKey) {
      setIsVerified(true);
      alert('인증번호가 확인되었습니다.');
    } else {
      alert('인증번호가 일치하지 않습니다.');
    }
  };

  const registerPhoneNumberMutation = useMutation({
    mutationKey: ['registerPhoneNumber'],
    mutationFn: () => postPhoneNumber({ phoneNumber }),
    onSuccess: (data) => {
      console.log('registerPhoneNumberMutation:', data);
      alert('전화번호가 등록되었습니다.');
    },
    onError: (error) => {
      console.error('전화번호 등록 실패', error);
    },
  });

  const handleVerifyPhoneNumber = () => {
    if (!/^\d{3}-\d{3,4}-\d{4}$/.test(phoneNumber)) {
      alert('-를 포함한 전화번호를 입력해주세요');
      return;
    }
    verifyPhoneNumberMutation.mutate();
  };

  const handleRegisterPhoneNumber = () => {
    if (!isVerified) {
      alert('인증번호를 확인해주세요.');
      return;
    }
    registerPhoneNumberMutation.mutate();
  };

  return (
    <>
      <label htmlFor="phoneNumber" className="text-gray-700 font-bold text-base">
        전화번호
      </label>
      <div className="flex gap-2 pb-2">
        <Input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          name="phoneNumber"
          placeholder="전화번호 입력"
          fontSize="base"
          width="9/12"
          className="focus:outline-none focus:border-primary"
        />
        <Button
          type="button"
          label="인증번호 요청"
          width="auto"
          fontSize="base"
          onClick={handleVerifyPhoneNumber}
          disabled={isVerified}
          className="text-white font-bold bg-primary hover:bg-blue-500 "
        />
      </div>
      <label htmlFor="verificationCode" className="text-gray-700 font-bold text-base">
        인증번호
      </label>
      <div className="flex gap-2 pb-2">
        <Input
          type="number"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          name="verificationCode"
          placeholder="인증번호 입력"
          width="9/12"
          fontSize="base"
          disabled={isVerified}
          className="focus:outline-none focus:border-primary"
        />
        <Button
          type="button"
          label="인증번호 확인"
          width="auto"
          fontSize="base"
          onClick={checkVerificationCode}
          disabled={isVerified}
          className="text-white font-bold bg-primary hover:bg-blue-500"
        />
      </div>
      <div className="flex justify-center mt-4">
        <Button
          type="button"
          label="등록"
          width="1/3"
          fontSize="base"
          onClick={handleRegisterPhoneNumber}
          disabled={!isVerified}
          className="text-white font-bold bg-primary hover:bg-blue-500"
        />
      </div>
    </>
  );
}
