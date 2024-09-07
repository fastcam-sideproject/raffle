import DaumPostcodeEmbed from 'react-daum-postcode';
import Button from '../lib/common/Button';
import Input from '../lib/common/Input';
import { useAddress } from '../lib/hooks/useAddress';

type AddressModalProps = {
  onClose: () => void;
};

export default function AddressModal({ onClose }: AddressModalProps) {
  const {
    address,
    detailAddress,
    isPostcodeOpen,
    setIsPostcodeOpen,
    handleComplete,
    handleOnChange,
    handleRegisterAddress,
  } = useAddress();

  const handleRegisterAndClose = () => {
    handleRegisterAddress();
    onClose();
  };

  return (
    <div className="h-full w-full fixed inset-0 bg-gray-600 bg-opacity-40 overflow-y-auto  flex items-center justify-center">
      <div className="w-auto max-h-[90%] sm:w-[75%] md:w-[60%]  shadow-lg lg:w-[35%]  bg-white rounded p-8">
        <h2 className="text-lg sm:text-2xl font-bold mb-4">주소 수정</h2>
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
            label="우편찾기"
            onClick={() => setIsPostcodeOpen(true)}
            width="auto"
            fontSize="sm"
            className="sm:text-base text-white font-bold bg-gray-400 hover:bg-gray-500"
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
            label="주소등록"
            onClick={handleRegisterAndClose}
            width="auto"
            fontSize="sm"
            className="sm:text-base text-white font-bold bg-primary hover:bg-blue-500"
          />
        </div>
        {isPostcodeOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-40 overflow-y-auto h-full w-full">
            <div className="relative top-36 w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 h-auto mx-auto p-5 shadow-lg border bg-white">
              <button className="absolute top-2 right-2" onClick={() => setIsPostcodeOpen(false)}>
                닫기
              </button>
              <div className="mt-10">
                <DaumPostcodeEmbed onComplete={handleComplete} />
              </div>
            </div>
          </div>
        )}
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
