import { useState } from 'react';
import Button from '../../lib/common/Button';
import useAuthStore from '../../lib/store/useAuthStore';
import NumberGuessingGame from '../NumberGuessingGame';
import MemoryCardGame from '../MemoryCardGame';
import NumberBaseballGame from '../NumberBaseballGame';
import MovingGame from '../MovingGame';

export default function HomeHero() {
  const [isNumberGuessingGameStart, setIsNumberGuessingGameStart] = useState<boolean>(false);
  const [isMemoryCardGameStart, setIsMemoryCardGameStart] = useState<boolean>(false);
  const [isNumberBaseballGameStart, setIsNumberBaseballGameStart] = useState<boolean>(false);
  const [isCatchGameStart, setIsCatchGameStart] = useState<boolean>(false);

  const userToken = useAuthStore((state) => state.userToken);

  const handleShowNumberGuessingGame = () => {
    if (userToken) {
      setIsNumberGuessingGameStart(true);
    } else {
      alert('로그인해주세요.');
    }
  };

  const handleShowMemoryCardGame = () => {
    if (userToken) {
      setIsMemoryCardGameStart(true);
    } else {
      alert('로그인해주세요.');
    }
  };

  const handleShowNumberBaseballGame = () => {
    if (userToken) {
      setIsNumberBaseballGameStart(true);
    } else {
      alert('로그인해주세요.');
    }
  };

  const handleCatchGame = () => {
    if (userToken) {
      setIsCatchGameStart(true);
    } else {
      alert('로그인해주세요.');
    }
  };

  return (
    <section className="min-h-[40rem] flex flex-col items-center justify-center bg-blue-50">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-lg md:text-3xl font-bold mb-4 text-shadow-white-shadow">
          All You Raffle 에 오신것을 환영합니다
        </h2>
        <p className="md:text-xl mb-6 text-shadow-white-shadow">행운을 받아가세요!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">숫자 맞추기 게임 7️⃣</h3>
            <p className="mb-4">1부터 100까지의 숫자를 맞춰 응모권을 획득하세요!</p>
            <Button
              label="시작하기"
              width="full"
              fontSize="base"
              className="text-white font-bold bg-primary hover:bg-blue-500"
              type="button"
              onClick={handleShowNumberGuessingGame}
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
              onClick={handleShowMemoryCardGame}
            />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">숫자야구 게임 ⚾️</h3>
            <p className="mb-4">3자리 숫자를 맞춰 응모권을 획득하세요!</p>
            <Button
              label="시작하기"
              width="full"
              fontSize="base"
              className="text-white font-bold bg-primary hover:bg-blue-500"
              type="button"
              onClick={handleShowNumberBaseballGame}
            />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">티켓 잡기게임 🍀</h3>
            <p className="mb-4">티켓 을 잡고 응모권을 얻으세요!</p>
            <Button
              label="시작하기"
              width="full"
              fontSize="base"
              className="text-white font-bold bg-primary hover:bg-blue-500"
              type="button"
              onClick={handleCatchGame}
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
      {userToken && isNumberBaseballGameStart && (
        <NumberBaseballGame onClose={() => setIsNumberBaseballGameStart(false)} />
      )}
      {userToken && isCatchGameStart && <MovingGame onClose={() => setIsCatchGameStart(false)} />}
    </section>
  );
}
