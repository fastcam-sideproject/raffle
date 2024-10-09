import React, { useEffect, useState } from 'react';
// import useTicketPlusOne from '../lib/hooks/useTicketPlusOne';
import Button from '../lib/common/Button';

export default function NumberBaseballGame({ onClose }: { onClose: () => void }) {
  const [targetNumber, setTargetNumber] = useState<number[]>([]);
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  // const { mutate } = useTicketPlusOne();

  useEffect(() => {
    handleResetGame();
  }, []);

  /**
   * @description 3자리 서로 다른 숫자 생성
   * @returns
   */
  const generateTargetNumber = () => {
    const numbers: number[] = [];
    while (numbers.length < 3) {
      const rand = Math.floor(Math.random() * 10);
      if (!numbers.includes(rand)) {
        numbers.push(rand);
      }
    }
    return numbers;
  };

  // 환경 감지 (Android 또는 iOS)
  const isIOS = () => {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  const handleGuess = () => {
    const guessArray = guess.split('').map(Number);

    if (guessArray.length !== 3 || guessArray.some(isNaN)) {
      setMessage('3자리 숫자를 입력해주세요.');
      return;
    }
    let strikes = 0;
    let balls = 0;

    guessArray.forEach((num, index) => {
      if (num === targetNumber[index]) {
        strikes++;
      } else if (targetNumber.includes(num)) {
        balls++;
      }
    });

    setAttempts(attempts + 1);

    if (strikes === 3) {
      setMessage(`축하합니다! ${attempts + 1}번 만에 맞췄습니다.`);
      setGameOver(true);

      // 성공 시 모바일로 알림 전송
      if (isIOS()) {
        // iOS 성공 알림
        if (typeof window !== 'undefined' && window.webkit?.messageHandlers?.Mobile?.postMessage) {
          window.webkit.messageHandlers.Mobile.postMessage(true);
        }
      } else {
        // Android 성공 알림
        if (typeof window !== 'undefined' && window.Mobile?.sendToMobile) {
          window.Mobile.sendToMobile(true);
        }
      }

      // mutate(); // 티켓 지급
    } else {
      setMessage(`${strikes} 스트라이크, ${balls} 볼`);
    }

    setGuess('');
  };

  /**
   * @description 게임을 초기화
   */
  const handleResetGame = () => {
    setTargetNumber(generateTargetNumber());
    setGuess('');
    setMessage('');
    setAttempts(0);
    setGameOver(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleGuess();
    }
  };

  const handleCloseModal = () => {
    if (isIOS()) {
      // iOS 취소 알림
      if (
        typeof window !== 'undefined' &&
        window.webkit?.messageHandlers?.MobileCancel?.postMessage
      ) {
        window.webkit.messageHandlers.MobileCancel.postMessage(null);
      }
    } else {
      // Android 취소 알림
      if (typeof window !== 'undefined' && window.Mobile?.sendCancel) {
        window.Mobile.sendCancel();
      }
    }
    onClose();
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
          <h2 className="text-2xl font-bold mb-4">숫자 야구 게임</h2>
          <p className="mb-4">3자리 숫자를 맞춰 응모권을 획득하세요!</p>
          {!gameOver ? (
            <>
              <input
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="3자리 숫자를 입력하세요"
                className="w-full p-2 mb-4 border border-gray-300"
              />
              <Button
                label="확인"
                type="button"
                fontSize="base"
                width="full"
                className="text-white font-bold bg-primary hover:bg-blue-500"
                onClick={handleGuess}
              />
            </>
          ) : (
            <Button
              label="다시 시작하기"
              type="button"
              fontSize="base"
              width="full"
              className="bg-gray-500 text-white p-2 hover:bg-gray-600"
              onClick={handleResetGame}
            />
          )}
          {message && <p className="mt-4 text-lg">{message}</p>}
        </div>
      </section>
    </main>
  );
}
