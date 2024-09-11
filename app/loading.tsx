'use client';

import { useEffect, useState } from 'react';

export default function Loading() {
  const text = 'All You Raffle';
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-primary text-4xl font-bold flex gap-1">
        {text.split('').map((char, index) => (
          <span
            key={index}
            className={`transition-all transform ${
              currentIndex > index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{
              animation: `slideUp 0.5s ease-out ${index * 0.1}s infinite`,
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
