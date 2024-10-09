import React, { useState, useEffect } from 'react';
import { sendCancelMessage, sendSuccessMessage } from '../lib/utils/mobileActions';

// import useTicketPlusOne from '../lib/hooks/useTicketPlusOne';

export default function ClickSpeedTest({ onClose }: { onClose: () => void }) {
  const [clicks, setClicks] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);
  const [hasMutated, setHasMutated] = useState<boolean>(false);
  const [gameFailed, setGameFailed] = useState<boolean>(false);

  // const { mutate } = useTicketPlusOne();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameStarted(false);
      const finalResult = clicks / 10;
      setResult(finalResult);
      if (finalResult >= 5 && !hasMutated) {
        sendSuccessMessage(); // 성공 메시지 전송
        setHasMutated(true);
      } else if (!hasMutated) {
        setGameFailed(true);
      }
    }
    return () => clearInterval(timer);
  }, [gameStarted, timeLeft, hasMutated, clicks]);

  const startGame = () => {
    setClicks(0);
    setTimeLeft(10);
    setGameStarted(true);
    setResult(null);
    setHasMutated(false);
    setGameFailed(false);
  };

  const handleClick = () => {
    if (gameStarted) {
      setClicks((clicks) => clicks + 1);
    }
  };

  const handleCloseModal = () => {
    sendCancelMessage(); // 취소 메시지 전송
    onClose();
  };

  return (
    <main className="fixed inset-0 flex items-center justify-center z-[1000] bg-gray-600 bg-opacity-50">
      <section className="relative max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto flex flex-col items-center bg-white rounded p-6">
        <div className="absolute top-1 right-1">
          <button onClick={handleCloseModal}>
            <img src="/icon/cancel.svg" alt="닫기 아이콘" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 lg:mb-8">
            Click Speed Test
          </h1>
          <div
            className={`w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full ${
              gameStarted ? 'bg-red-500' : 'bg-gray-300'
            } flex items-center justify-center cursor-pointer mb-4 md:mb-6 lg:mb-8`}
            onClick={handleClick}
          >
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              {gameStarted ? clicks : 'Click!'}
            </span>
          </div>
          <div className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 lg:mb-4">
            {gameStarted ? `Time: ${timeLeft}s` : 'Click to start'}
          </div>
          {result !== null && (
            <>
              <div className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 lg:mb-4">
                Your speed: {result?.toFixed(2)} clicks/second
              </div>
            </>
          )}
          {gameFailed && (
            <p className="text-lg text-red-500 mb-2 md:mb-3 lg:mb-4">
              게임에 실패하셨습니다. 10초 안에 50번 이상 클릭하셔야 합니다.
            </p>
          )}
          {!gameStarted && (
            <button
              className="px-3 py-1 md:px-4 md:py-2 lg:px-5 lg:py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              onClick={startGame}
            >
              Start Game
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
