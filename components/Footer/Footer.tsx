'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // "app-game" 경로에서는 Footer를 렌더링하지 않음
  if (pathname === '/app-game') {
    return null;
  }
  return (
    <footer className="w-full bg-gray-50">
      <div className="px-24 py-10 grid grid-cols-4 gap-12 max-md:flex max-md:flex-col max-md:p-10">
        <div className="flex flex-col gap-8">
          <Image
            width={100}
            height={100}
            src="/image/logo/logo_title.png"
            alt="Logo"
            className="w-36 h-auto"
          />
          <div className="text-gray-300 text-[0.7rem]">
            상호 : 올유래플
            <br />
            대표자 명 : 김시환 <br />
            사업자 등록번호 : 580 - 46 - 01046
            <br />
            문의 이 메일 : <Link href="/contact">allyouraffle.info@gmail.com</Link>
            <br />
            사업장 소재지 : 경기도 용인시 기흥구 서그내로 46 - 14
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <span className="text-gray-300">Links</span>
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="flex flex-col gap-8">
          <span className="text-gray-300">Help</span>
          <Link href="/privacy-policies" className="font-bold">
            개인 정보 처리 방침
          </Link>
          <span>Payment Option</span>
          <span>Returns</span>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-gray-300">Kakao Pay</span>
          <Image
            width={200}
            height={200}
            src="/image/logo/kakao_pay_logo.png"
            alt="카카오페이로고"
          />
        </div>
      </div>
    </footer>
  );
}
