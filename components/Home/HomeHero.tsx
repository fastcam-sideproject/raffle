import { useEffect, useState } from 'react';
import Button from '../../lib/common/Button';
import Advertisement from '../Advertisement/Advertisement';
import useAuthStore from '../../lib/store/useAuthStore';
import NumberGuessingGame from '../NumberGuessingGame';
import MemoryCardGame from '../MemoryCardGame';

export default function HomeHero() {
  const [isShowAdvertisement, setIsShowAdvertisement] = useState<boolean>(false);
  const [isNumberGuessingGameStart, setIsNumberGuessingGameStart] = useState<boolean>(false);
  const [isMemoryCardGameStart, setIsMemoryCardGameStart] = useState<boolean>(false);
  const userToken = useAuthStore((state) => state.userToken);

  const handleShowAdvertisement = () => {
    if (userToken) {
      setIsShowAdvertisement(true);
    } else {
      alert('로그인해주세요.');
    }
  };

  useEffect(() => {
    if (!isShowAdvertisement) {
      setIsShowAdvertisement(false);
    }
  }, [isShowAdvertisement]);

  return (
    <section className="min-h-[25rem] flex flex-col items-center justify-center bg-blue-50">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-lg md:text-3xl font-bold mb-4 text-shadow-white-shadow">
          All You Raffle 에 오신것을 환영합니다
        </h2>
        <p className="md:text-xl mb-6 text-shadow-white-shadow">행운을 받아가세요!</p>
        <div className="pt-4">
          <Button
            label="광고 보고 응모권 추가하기"
            width="auto"
            fontSize="base"
            className="text-white font-bold bg-primary hover:bg-blue-500"
            type="button"
            onClick={handleShowAdvertisement}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">숫자 맞추기 게임</h3>
            <p className="mb-4">1부터 100까지의 숫자를 맞춰 응모권을 획득하세요!</p>
            <Button
              label="시작하기"
              width="full"
              fontSize="base"
              className="text-white font-bold bg-primary hover:bg-blue-500"
              type="button"
              onClick={() => setIsNumberGuessingGameStart(true)}
            />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">메모리 카드 게임 🍎🍌</h3>
            <p className="mb-4">카드를 뒤집어 짝을 맞춰 응모권을 획득하세요!</p>
            <Button
              label="시작하기"
              width="full"
              fontSize="base"
              className="text-white font-bold bg-primary hover:bg-blue-500"
              type="button"
              onClick={() => setIsMemoryCardGameStart(true)}
            />
          </div>
        </div>
      </div>
      {userToken && isNumberGuessingGameStart && (
        <NumberGuessingGame onClose={() => setIsNumberGuessingGameStart(false)} />
      )}
      {userToken && isMemoryCardGameStart && (
        <MemoryCardGame onClose={() => setIsMemoryCardGameStart(false)} />
      )}
      {userToken && isShowAdvertisement && (
        <Advertisement onClose={() => setIsShowAdvertisement(false)} />
      )}
    </section>
  );
}
