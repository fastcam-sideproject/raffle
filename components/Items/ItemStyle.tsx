import Image from 'next/image';

interface ItemProps {
  name: string;
  category: number;
  imageUrl: string;
  currentCount: number;
  totalCount: number;
}

function ItemStyle({ name, category, imageUrl, currentCount, totalCount }: ItemProps) {
  const percentageComplete = Math.round((currentCount / totalCount) * 100);
  return (
    <div className="p-4 w-full flex flex-col gap-4">
      <Image width={100} height={100} src={imageUrl} alt="상품이미지" className="w-full" />
      <div className="bg-gray-50 p-4 w-full">
        <div>
          <h4 className="text-lg font-bold">{name}</h4>
          <span className="text-gray-400">카테고리{category}</span>
        </div>
        <button
          className={`mt-2 px-2 py-1 ${
            percentageComplete === 100 ? 'bg-red-400' : 'bg-blue-400'
          } text-white rounded float-right max-md:float-none max-md:w-full`}
          type="button"
        >
          {percentageComplete === 100 ? '결과확인' : '구매하기'}
        </button>
        <div>
          <span className="text-lg font-semibold">{percentageComplete}%</span>
          <span>{percentageComplete === 100 ? '진행중' : '완료'}</span>
        </div>
        <div className="mt-6 w-full  bg-gray-300 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              percentageComplete === 100 ? 'bg-red-400' : 'bg-blue-400'
            }`}
            style={{ width: `${percentageComplete}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default ItemStyle;
