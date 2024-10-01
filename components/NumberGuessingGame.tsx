import React, { useEffect, useState } from 'react';
import Button from '../lib/common/Button';
// import useTicketPlusOne from '../lib/hooks/useTicketPlusOne';
import { on } from 'events';

export default function NumberGuessingGame({ onClose }: { onClose: () => void }) {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  // const { mutate } = useTicketPlusOne();

  useEffect(() => {
    handleResetGame();
  }, []);

  /**
   * @description 숫자를 맞추는 함수.
   */
  const handleGuess = () => {
    const guessNumber = parseInt(guess, 10);

    if (isNaN(guessNumber)) return;
    setAttempts(attempts + 1);

    if (guessNumber === targetNumber) {
      setMessage(`축하합니다. ${attempts + 1}번 만에 맞추셨습니다.`);
      alert('앱 심사중으로 쿠폰이 발급되질 않습니다! 심사후에 이용해주세요!');
      setGameOver(true);
      // mutate();
    } else if (guessNumber < targetNumber) {
      setMessage('더 큰 숫자를 입력해보세요.');
    } else {
      setMessage('더 작은 숫자를 입력해보세요.');
    }
    setGuess('');
  };

  /**
   * @description 게임을 초기화합니다.
   */
  const handleResetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('');
    setAttempts(0);
    setGameOver(false);
  };

  const handleCloseModal = () => {
    onClose();
    handleResetGame();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleGuess();
    }
  };

  return (
    <main className="fixed inset-0 flex items-center justify-center z-[1000] bg-gray-600 bg-opacity-50 ">
      <section className="relative w-auto h-auto flex flex-col items-center bg-white rounded p-6">
        <div className="absolute top-1 right-1">
          <button onClick={handleCloseModal}>
            <img src="/icon/cancel.svg" alt="닫기 아이콘" />
          </button>
        </div>
        <div className="max-w-md mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">숫자 맞추기 게임</h2>
          <p className="mb-4">1부터 100 사이의 숫자를 맞춰보세요!</p>
        </div>
        {!gameOver ? (
          <>
            <input
              type="number"
              value={guess}
              onKeyPress={handleKeyPress}
              onChange={(event) => setGuess(event.target.value)}
              placeholder="숫자를 입력하세요"
              className="w-full p-2 mb-4  border border-gray-300"
            />
            <Button
              label="확인"
              type="button"
              fontSize="base"
              width="full"
              onClick={handleGuess}
              className="text-white p-2 bg-primary hover:bg-blue-500 "
            />
          </>
        ) : (
          <Button
            label="게임 재시작"
            type="button"
            fontSize="base"
            width="full"
            onClick={handleResetGame}
            className="bg-gray-500 text-white p-2 hover:bg-gray-600"
          />
        )}
        {message && (
          <div className="mt-4 p-2 border border-gray-300 rounded bg-gray-100">{message}</div>
        )}
      </section>
    </main>
  );
}
