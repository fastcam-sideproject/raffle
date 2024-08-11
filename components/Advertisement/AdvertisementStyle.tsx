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
      className={`${
        toggle
          ? 'hidden'
          : 'fixed inset-0 z-50 bg-gray-600 bg-opacity-40 flex items-center justify-center'
      }`}
    >
      <section className="w-11/12 md:w-4/5 lg:w-3/5 h-auto max-h-[90%] flex flex-col gap-6 justify-center items-center bg-white rounded-lg p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-center">광고타이틀</h2>
        <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
          <Image
            width={1000}
            height={1000}
            src="/image/background/1.jpg"
            alt="광고이미지"
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            aria-label="광고닫기"
            type="button"
            className="absolute top-4 right-4 bg-slate-50 p-2 md:p-4 rounded-lg text-xs md:text-base"
            onClick={handleCloseButton}
          >
            광고닫기 광고닫는 숫자들어감
          </button>
        </div>
        <button
          aria-label="응모하기"
          type="button"
          className="bg-blue-400 py-2 px-6 md:py-4 md:px-8 rounded-xl text-white text-sm md:text-base"
        >
          응모하기
        </button>
      </section>
    </main>
  );
}
