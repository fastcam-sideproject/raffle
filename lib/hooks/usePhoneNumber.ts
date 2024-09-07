import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import useAuthStore from '../store/useAuthStore';
import { postPhoneNumber, postVerifyPhone } from '../../api/user/phoneNumberApi';

export default function usePhoneNumber() {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const userToken = useAuthStore((state) => state.userToken);

  const verifyPhoneNumberMutation = useMutation({
    mutationKey: ['verifyPhoneNumber'],
    mutationFn: () => postVerifyPhone({ phoneNumber, userToken }),
    onSuccess: (data) => {
      setSecretKey(data.secretKey);
      alert('인증번호가 발송되었습니다.');
    },
    onError: (error) => {
      console.error('휴대폰 인증번호 요청 실패', error);
    },
  });

  const registerPhoneNumberMutation = useMutation({
    mutationKey: ['registerPhoneNumber'],
    mutationFn: () => postPhoneNumber({ phoneNumber, userToken }),
    onSuccess: () => {
      alert('전화번호가 등록되었습니다.');
    },
    onError: (error) => {
      console.error('전화번호 등록 실패', error);
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

  const handleVerifyPhoneNumber = () => {
    if (!/^\d{3}-\d{3,4}-\d{4}$/.test(phoneNumber)) {
      alert('전화번호를 입력해주세요');
      return;
    }
    verifyPhoneNumberMutation.mutate();
  };

  const handleRegisterPhoneNumber = () => {
    if (!isVerified) {
      alert('휴대폰 인증을 완료해주세요');
      return;
    }
    registerPhoneNumberMutation.mutate();
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    let formatted = '';

    if (cleaned.length <= 3) {
      formatted = cleaned;
    } else if (cleaned.length <= 7) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
    }
    return formatted;
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    setPhoneNumber(formattedPhoneNumber);
  };

  return {
    phoneNumber,
    verificationCode,
    isVerified,
    handlePhoneNumberChange,
    setVerificationCode,
    checkVerificationCode,
    handleVerifyPhoneNumber,
    handleRegisterPhoneNumber,
  };
}
