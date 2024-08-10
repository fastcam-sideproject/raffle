'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function AdvertisementStyle() {
  const [toggle, setToggle] = useState(false);

  const handleCloseButton = () => {
    setToggle(!toggle);
  };

  return (
    <main
      className={`${toggle ? 'hidden' : 'absolute top-0  z-50 bg-gray-600 w-full min-h-full bg-opacity-40 flex items-center justify-center'}`}
    >
      <section className="w-3/4 h-full mt-40 flex flex-col gap-6 justify-center items-center">
        <h2>광고타이틀</h2>
        <div className="relative w-full">
          <Image
            width={1000}
            height={1000}
            src="/image/background/1.jpg"
            alt="광고이미지"
            className="w-full h-full"
          />
          <button
            aria-label="광고닫기"
            type="button"
            className="absolute top-4 right-4 bg-slate-50 p-4 rounded-lg"
            onClick={handleCloseButton}
          >
            광고닫기 광고닫는 숫자들어감
          </button>
        </div>
        <button
          aria-label="응모하기"
          type="button"
          className="bg-blue-400 py-4 px-8 rounded-2xl text-white"
        >
          응모하기
        </button>
      </section>
    </main>
  );
}
