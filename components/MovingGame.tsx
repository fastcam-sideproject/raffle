import { useEffect, useRef, useState } from 'react';
import { sendCancelMessage, sendSuccessMessage } from '../lib/utils/mobileActions';

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

  useEffect(() => {
    if (score >= 5) {
      sendSuccessMessage(); // 성공 시 메시지 전송
      onClose();
    }
  }, [score, onClose]);

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

    // 키보드 입력 처리
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      keys[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();
      keys[e.key] = false;
    };

    // 터치 입력 처리
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

    // 이벤트 리스너를 캔버스에 추가
    canvas.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);

    const gameLoop = () => {
      // 키보드 입력에 따른 플레이어 이동
      if (keys['ArrowUp'] && player.y > 0) player.y -= player.speed;
      if (keys['ArrowDown'] && player.y + player.height < canvas.height) player.y += player.speed;
      if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
      if (keys['ArrowRight'] && player.x + player.width < canvas.width) player.x += player.speed;

      // 충돌 감지
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

      // 화면 초기화
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 플레이어 그리기
      ctx.fillStyle = 'blue';
      ctx.fillRect(player.x, player.y, player.width, player.height);

      // 목표물 그리기
      if (targetImage.current?.complete) {
        ctx.drawImage(targetImage.current, target.x, target.y, target.width, target.height);
      }

      requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      // 이벤트 리스너 제거
      canvas.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleCloseModal = () => {
    sendCancelMessage(); // 취소 시 메시지 전송
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
            tabIndex={0}
          ></canvas>
          <div className="mt-4 text-lg">Score: {score}</div>
        </div>
      </section>
    </main>
  );
}
