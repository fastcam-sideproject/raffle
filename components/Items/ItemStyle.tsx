import Image from 'next/image';
import Link from 'next/link';
import { ItemProps } from '../../lib/types/item';
import navigateToPurchasePage from '../../lib/utils/navigateToPurchasePage';
import Button from '../../lib/common/Button';

export default function ItemStyle({
  name,
  category,
  imageUrl,
  currentCount,
  totalCount,
  raffleId,
}: ItemProps) {
  const percentageComplete = parseFloat(((currentCount / totalCount) * 100).toFixed(2));

  const handlePurchasePage = navigateToPurchasePage({ raffleId });

  return (
    <li id={raffleId} className="p-4 w-full flex flex-col gap-4 rounded shadow-custom-light">
      <Link href={`shop/detail/${raffleId}`}>
        <Image
          priority
          width={400}
          height={400}
          src={imageUrl}
          alt="추첨할 상품 이미지"
          className="w-full h-80 rounded object-contain"
        />
      </Link>
      <div className="bg-gray-50 p-4 w-full rounded">
        <div>
          <h4 className="text-lg font-bold">{name}</h4>
          <span className="text-gray-400">카테고리{category}</span>
        </div>
        <Button
          type="button"
          ariaLabel={percentageComplete === 100 ? '결과 확인' : '응모하기'}
          label={percentageComplete === 100 ? '결과 확인' : '응모하기'}
          width=""
          fontSize=""
          className={`mt-2 px-2 py-1 ${
            percentageComplete === 100 ? 'bg-secondary' : 'bg-primary'
          } text-white rounded float-right max-md:float-none max-md:w-full`}
          onClick={percentageComplete !== 100 ? handlePurchasePage : undefined}
        />

        <div>
          <span className="text-lg font-semibold">{percentageComplete}%</span>
          <span>{percentageComplete === 100 ? '진행중' : '완료'}</span>
        </div>
        <div className="mt-6 w-full bg-gray-300 rounded-full h-3 overflow-hidden ">
          <div
            className={`h-full transition-all duration-300 ${
              percentageComplete === 100 ? 'bg-secondary' : 'bg-primary'
            }`}
            style={{ width: `${percentageComplete}%` }}
          />
        </div>
      </div>
    </li>
  );
}
