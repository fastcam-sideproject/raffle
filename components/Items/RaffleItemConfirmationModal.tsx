import Image from 'next/image';
import Button from '../../lib/common/Button';

export default function RaffleItemConfirmationModal({
  isOpen,
  onClose,
  itemName,
  itemImageUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemImageUrl: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="w-11/12 md:w-4/5 lg:w-3/5 flex flex-col items-center bg-white rounded shadow-lg">
        <div className=" w-full rounded-t bg-primary  text-white flex justify-center p-6">
          <h2 className="text-2xl font-semibold">응모 완료</h2>
        </div>
        <div className="flex flex-col p-6 gap-6">
          <Image
            priority
            src={itemImageUrl}
            alt={`${itemName} 이미지`}
            width={400}
            height={400}
            className="w-full h-80"
          />
          <h3 className="font-semibold text-center text-xl">{itemName}</h3>
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
