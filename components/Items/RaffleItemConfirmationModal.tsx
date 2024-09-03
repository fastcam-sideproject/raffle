import Image from 'next/image';
import Button from '../../lib/common/Button';

type RaffleItemConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemImageUrl: string;
};

export default function RaffleItemConfirmationModal({
  isOpen,
  onClose,
  itemName,
  itemImageUrl,
}: RaffleItemConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-gray-600 bg-opacity-50 ">
      <div className="w-auto max-h-[90%] sm:w-[75%] md:w-[60%] lg:w-[35%] flex flex-col items-center bg-white rounded shadow-lg">
        <div className="w-full rounded-t bg-primary text-white flex justify-center p-6">
          <h2 className="text-2xl font-semibold">{itemName} 응모완료</h2>
        </div>
        <div className="flex flex-col p-6">
          <Image
            priority
            src={itemImageUrl}
            alt={`${itemName} 이미지`}
            width={400}
            height={400}
            className="w-full h-60 "
          />
          <h3 className="font-semibold text-center text-xl">{itemName}</h3>
        </div>
        <div className="pb-6 flex flex-col sm:flex-row gap-4 sm:gap-20">
          <Button
            className="bg-primary hover:bg-blue-500 px-8 py-3"
            onClick={onClose}
            label="확인"
            type="button"
            ariaLabel="확인"
            fontSize="base"
            width="auto"
          />
        </div>
      </div>
    </div>
  );
}
