import Button from '../../lib/common/Button';
import Input from '../../lib/common/Input';
import usePhoneNumber from '../../lib/hooks/usePhoneNumber';

export default function PhoneNumber() {
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

  return (
    <div>
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
          label="인증요청"
          width="1/3"
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
          label="확인"
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
          width="auto"
          fontSize="base"
          onClick={handleRegisterPhoneNumber}
          disabled={!isVerified}
          className="text-white font-bold bg-primary hover:bg-blue-500"
        />
      </div>
    </div>
  );
}
