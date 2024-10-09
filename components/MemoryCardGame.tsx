import React, { useEffect, useState } from 'react';
import { sendCancelMessage, sendSuccessMessage } from '../lib/utils/mobileActions';

// import useTicketPlusOne from '../lib/hooks/useTicketPlusOne';

export default function MemoryCardGame({ onClose }: { onClose: () => void }) {
  const [cards, setCards] = useState<{ id: number; symbol: string; flipped: boolean }[]>([]);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  // const { mutate } = useTicketPlusOne();

  const symbols = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍑', '🍍', '🥝'];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        flipped: false,
      }));
    setCards(shuffledCards);
    setFlippedIndexes([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameOver(false);
  };

  const handleCardClick = (index: number) => {
    if (
      flippedIndexes.length === 2 ||
      flippedIndexes.includes(index) ||
      matchedPairs.includes(cards[index].symbol)
    )
      return;
    const newFlippedIndexes = [...flippedIndexes, index];
    setFlippedIndexes(newFlippedIndexes);

    if (newFlippedIndexes.length === 2) {
      setMoves(moves + 1);
      const [firstIndex, secondIndex] = newFlippedIndexes;
      if (cards[firstIndex].symbol === cards[secondIndex].symbol) {
        setMatchedPairs([...matchedPairs, cards[firstIndex].symbol]);
        setFlippedIndexes([]);
        if (matchedPairs.length + 1 === symbols.length) {
          setGameOver(true);
          sendSuccessMessage(); // 성공 메시지 전송
        }
      } else {
        setTimeout(() => setFlippedIndexes([]), 1000);
      }
    }
  };

  const handleCloseModal = () => {
    sendCancelMessage(); // 취소 메시지 전송
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
        <div className="max-w-md mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4">메모리 카드 게임</h2>
          <p className="mb-4">카드를 뒤집어 짝을 맞춰보세요!</p>

          <div className="grid grid-cols-4 gap-2 mb-4">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`h-16 flex items-center justify-center text-2xl cursor-pointer ${
                  flippedIndexes.includes(index) || matchedPairs.includes(card.symbol)
                    ? 'bg-blue-200'
                    : 'bg-gray-300'
                }`}
                onClick={() => handleCardClick(index)}
              >
                {flippedIndexes.includes(index) || matchedPairs.includes(card.symbol)
                  ? card.symbol
                  : '?'}
              </div>
            ))}
          </div>
          <p className="mb-4">Moves: {moves}</p>
          {gameOver && (
            <div className="mb-4">
              <p className="font-bold">축하합니다! 게임을 완료했습니다.</p>
              <p>총 {moves}번 만에 성공하셨습니다.</p>
            </div>
          )}
          <button
            onClick={initializeGame}
            className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            새 게임 시작
          </button>
        </div>
      </section>
    </main>
  );
}
