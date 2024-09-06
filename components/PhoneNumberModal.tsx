import Input from '../lib/common/Input';
import Button from '../lib/common/Button';
import usePhoneNumber from '../lib/hooks/usePhoneNumber';

type PhoneNumberModalProps = {
  onClose: () => void;
};

export default function PhoneNumberModal({ onClose }: PhoneNumberModalProps) {
  const {
    phoneNumber,
    verificationCode,
    isVerified,
    handlePhoneNumberChange,
    setVerificationCode,
    checkVerificationCode,
    handleVerifyPhoneNumber,
    handleRegisterPhoneNumber,
  } = usePhoneNumber();

  const handleRegisterAndClose = () => {
    handleRegisterPhoneNumber();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-40 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="w-auto max-h-[90%] sm:w-[75%] md:w-[60%]  shadow-lg lg:w-[35%]  bg-white rounded p-8">
        <h2 className="text-2xl font-bold mb-4">전화번호 수정</h2>
        <label htmlFor="phoneNumber" className="text-gray-700 font-bold text-base">
          전화번호
        </label>
        <div className="flex gap-2 pb-2">
          <Input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
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
            label="전화번호 등록"
            width="1/3"
            fontSize="base"
            onClick={handleRegisterAndClose}
            disabled={!isVerified}
            className="text-white font-bold bg-primary hover:bg-blue-500"
          />
        </div>
        <div className="flex justify-center mt-4">
          <Button
            type="button"
            label="닫기"
            width="1/3"
            fontSize="base"
            onClick={onClose}
            className="text-white font-bold bg-gray-500 hover:bg-gray-700"
          />
        </div>
      </div>
    </div>
  );
}
