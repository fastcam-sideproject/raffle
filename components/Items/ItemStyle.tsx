import Image from 'next/image';

interface ItemProps {
  name: string;
  category: number;
  imageUrl: string;
  defaultTotalCount: number;
}

function ItemStyle({ name, category, imageUrl, defaultTotalCount }: ItemProps) {
  return (
    <div className="p-4 w-full">
      <Image width={100} height={100} src={imageUrl} alt="상품이미지" />
      <h4 className="text-lg font-bold">{name}</h4>
      <span>카테고리 {category}</span>
      <div>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" type="button">
          구매하기
        </button>
        <div className="mt-2 w-full bg-gray-300 rounded-full h-6 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              defaultTotalCount === 100 ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{ width: `${defaultTotalCount}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default ItemStyle;
