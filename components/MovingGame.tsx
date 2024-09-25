import { useEffect, useRef, useState } from 'react';
import useTicketPlusOne from '../lib/hooks/useTicketPlusOne';

interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

interface Target {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function MovingGame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState<number>(0);
  const targetImage = useRef<HTMLImageElement | null>(null);
  const { mutate } = useTicketPlusOne();

  useEffect(() => {
    if (score >= 5) {
      alert('티켓을 얻었습니다!');
      mutate();
      onClose();
    }
  }, [score, onClose]);

  /**
   * @description 캔버스 그리기
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let player: Player = { x: 50, y: 50, width: 20, height: 20, speed: 5 };
    let target: Target = {
      x: Math.random() * (canvas.width - 20),
      y: Math.random() * (canvas.height - 20),
      width: 20,
      height: 20,
    };

    let keys: { [key: string]: boolean } = {};

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      keys[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();
      keys[e.key] = false;
    };

    const image = new Image();
    image.src = '/icon/ticket.svg';
    targetImage.current = image;

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const gameLoop = () => {
      if (keys['ArrowUp'] && player.y > 0) player.y -= player.speed;
      if (keys['ArrowDown'] && player.y + player.height < canvas.height) player.y += player.speed;
      if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
      if (keys['ArrowRight'] && player.x + player.width < canvas.width) player.x += player.speed;

      /**
       * @description 충돌감지
       */
      if (
        player.x < target.x + target.width &&
        player.x + player.width > target.x &&
        player.y < target.y + target.height &&
        player.y + player.height > target.y
      ) {
        setScore((prevScore) => prevScore + 1);
        target.x = Math.random() * (canvas.width - 20);
        target.y = Math.random() * (canvas.height - 20);
      }

      /**
       * @description 화면 초기화
       */
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /**
       * @description 플레이어
       */
      ctx.fillStyle = 'blue';
      ctx.fillRect(player.x, player.y, player.width, player.height);

      /**
       * @description 목표물
       */
      if (targetImage.current?.complete) {
        ctx.drawImage(targetImage.current, target.x, target.y, target.width, target.height);
      }

      requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <main className="fixed inset-0 flex items-center justify-center z-[1000] bg-gray-600 bg-opacity-50">
      <section className="relative">
        <div className="absolute top-1 right-1">
          <button onClick={handleCloseModal}>
            <img src="/icon/cancel.svg" alt="닫기 아이콘" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center bg-gray-100 rounded p-6">
          <h2 className="text-2xl font-bold mb-4">티켓을 다섯장 잡으세요!</h2>
          <canvas
            ref={canvasRef}
            width={300}
            height={200}
            className="border-2 border-primary rounded"
          ></canvas>
          <div className="mt-4 text-lg">Score: {score}</div>
        </div>
      </section>
    </main>
  );
}
