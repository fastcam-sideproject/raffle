'use client';

import { useEffect, useState } from 'react';
import useAuthStore from '../lib/store/useAuthStore';
import NumberGuessingGame from './NumberGuessingGame';
import MemoryCardGame from './MemoryCardGame';
import NumberBaseballGame from './NumberBaseballGame';
import MovingGame from './MovingGame';
import ClickSpeedTest from './ClickSpeedTestGame';

export default function MobileGameStart() {
  const { hydrateToken, userToken } = useAuthStore((state) => ({
    hydrateToken: state.hydrateToken,
    userToken: state.userToken,
  }));

  useEffect(() => {
    hydrateToken();
  }, [hydrateToken]);

  const [activeGame, setActiveGame] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (userToken === null) return;

    const games = [
      <NumberGuessingGame onClose={() => setActiveGame(null)} key="numberGuessing" />,
      <MemoryCardGame onClose={() => setActiveGame(null)} key="memoryCard" />,
      <NumberBaseballGame onClose={() => setActiveGame(null)} key="numberBaseball" />,
      <MovingGame onClose={() => setActiveGame(null)} key="catchGame" />,
      <ClickSpeedTest onClose={() => setActiveGame(null)} key="clickSpeedTest" />,
    ];
    const randomGame = games[Math.floor(Math.random() * games.length)];
    setActiveGame(randomGame);
  }, [userToken]);

  if (userToken === null) {
    return <div>Loading...</div>;
  }

  return (
    <section className="min-h-[30rem] flex flex-col items-center justify-center bg-blue-50">
      {activeGame}
    </section>
  );
}
