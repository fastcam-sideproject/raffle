'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function AdvertisementStyle() {
  const [toggle, setToggle] = useState(false);

  const handleCloseButton = () => {
    setToggle(!toggle);
  };

  return (
    <main className="absolute z-50 bg-gray-600 w-full h-vh bg-opacity-40 flex items-center justify-center">
      <section className="w-3/4 h-full bg-red-600">
        <h2>광고타이틀</h2>
        <div className="relative">
          <Image width={100} height={100} src="" alt="광고이미지" className="w-full h-full" />
          <button
            aria-label="광고닫기"
            type="button"
            className="absolute top-0 right-4"
            onClick={handleCloseButton}
          >
            광고닫기
          </button>
        </div>
        <button aria-label="응모하기" type="button" className="bg-blue-400">
          응모하기
        </button>
      </section>
    </main>
  );
}
