'use client';

import { usePathname } from 'next/navigation';

export default function Banner() {
  const pathName = usePathname();
  const formattedPathName =
    pathName.replace('/', '').charAt(0).toUpperCase() + pathName.slice(2).toLocaleLowerCase();

  return (
    <div className="bg-[url('/image/background/shop_bg.jpg')] w-full h-28 lg:h-60 flex flex-col justify-center items-center">
      <span className="text-shadow-white-shadow font-extrabold text-4xl">
        {pathName === '/' ? 'Home' : formattedPathName}
      </span>
      <span className="text-shadow-white-shadow">{pathName === '/' ? '' : pathName}</span>
    </div>
  );
}
