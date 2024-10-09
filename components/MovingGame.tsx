import { useEffect, useRef, useState } from 'react';
// import useTicketPlusOne from '../lib/hooks/useTicketPlusOne';

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
  // const { mutate } = useTicketPlusOne();

  useEffect(() => {
    if (score >= 5) {
      // mutate();
      alert('앱 심사중으로 쿠폰이 발급되질 않습니다! 심사후에 이용해주세요!');
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
    let touchStartX: number = 0;
    let touchStartY: number = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      keys[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();
      keys[e.key] = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;

      if (deltaX > 0 && player.x + player.width < canvas.width) {
        player.x += player.speed; // 오른쪽 이동
      } else if (deltaX < 0 && player.x > 0) {
        player.x -= player.speed; // 왼쪽 이동
      }

      if (deltaY > 0 && player.y + player.height < canvas.height) {
        player.y += player.speed; // 아래쪽 이동
      } else if (deltaY < 0 && player.y > 0) {
        player.y -= player.speed; // 위쪽 이동
      }

      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    };

    const image = new Image();
    image.src = '/icon/ticket.svg';
    targetImage.current = image;

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);

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
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
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
          <div>키보드 방향키 또는 터치를 사용해 티켓을 잡으세요!</div>
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
