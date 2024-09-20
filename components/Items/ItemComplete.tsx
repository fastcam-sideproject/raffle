import Image from 'next/image';
import Button from '../../lib/common/Button';
import { ItemCompleteProps } from '../../lib/types/item';

export default function ItemComplete({ onClose, winner, imageUrl, name }: ItemCompleteProps) {
  return (
    <main className="fixed inset-0 z-[1050] bg-gray-600 bg-opacity-40 flex flex-col items-center justify-center">
      <section className="w-11/12 md:w-4/5 lg:w-3/5 h-auto max-h-[90%] flex flex-col gap-6 justify-center items-center bg-white rounded-lg p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-center text-gray-500 hidden">
          당첨자 안내
        </h2>
        <div className="w-full flex flex-col gap-2">
          <div className="shadow-custom-light w-full p-4 text-lg text-center font-bold rounded-lg text-shadow-white-shadow">
            {name}
          </div>
          <Image
            priority
            width={200}
            height={200}
            src={imageUrl}
            alt="추첨할 상품 이미지"
            className="w-auto h-52 rounded object-contain transition duration-300 group-hover:blur-sm"
          />
          <div className="bg-gray-50 p-4 text-center border-solid border-primary border-[1px] rounded-lg">
            <div className="font-bold">당첨을 축하드립니다!</div>
            <div className="my-4 font-bold">
              <span>{winner.nickname}</span>
              <span className="text-gray-400">
                ({winner?.phoneNumber ? `${winner.phoneNumber.slice(-4)}` : '번호 없음'})
              </span>
              <div>{winner.userId}</div>
            </div>

            <div>등록하신 휴대폰번호의 문자를 확인해주세요!</div>
          </div>
        </div>
        <Button
          type="button"
          ariaLabel="닫기"
          label="닫기"
          fontSize=""
          width=""
          onClick={onClose}
          className="bg-primary w-1/6 hover:bg-blue-500"
        />
      </section>
    </main>
  );
}
