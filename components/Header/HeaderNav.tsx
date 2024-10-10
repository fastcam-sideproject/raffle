'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { getTickets } from '../../api/user/ticketsApi';
import ProfilePopover from '../ProfilePopover';
import useAuthStore from '../../lib/store/useAuthStore';
import GoogleLoginButton from '../Button/GoogleLoginButton';

export default function HeaderNav() {
  const [isPopverOpen, setIsPopverOpen] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);

  const userToken = useAuthStore<string>((state) => state.userToken);
  const pathName = usePathname();

  /**
   * 사용자 응모권 갯수를 나타내는 useQuery
   * !!enabled: userToken이 존재할 때만 실행
   */
  const { data: ticketsCount, isLoading } = useQuery({
    queryKey: ['getTickets'],
    queryFn: () => getTickets(userToken),
    enabled: !!userToken,
  });

  if (isLoading) return <div>Loading...</div>;

  const handleProfileClick = () => {
    setIsPopverOpen(!isPopverOpen);
  };

  const handleClosePopver = () => {
    setIsPopverOpen(false);
  };

  const handleNavDropDown = () => {
    setToggle(!toggle);
  };

  const closeMenu = () => {
    setToggle(false);
  };

  return (
    <header className="w-full bg-slate-100 sticky top-0 border-solid border-b-1 border-indigo-900 shadow-custom-light z-[1000]">
      <nav className="flex justify-between items-center px-6 py-2">
        <Link href="/">
          <Image
            width={100}
            height={100}
            src="/image/logo/logo_title.png"
            alt="Logo_img"
            className="w-auto h-auto"
          />
        </Link>
        <ul
          className={`${
            toggle ? 'absolute w-full top-12 left-0 flex flex-col p-5 gap-1' : 'max-sm:hidden'
          } sm:flex sm:gap-3 sm:static sm:flex-row sm:w-auto sm:p-0`}
        >
          <li className="sm:border-none border-solid border-2 border-primary rounded-xl bg-slate-100 p-2 flex items-center justify-center">
            <Link
              href="/"
              className={`p-2 w-full text-center ${pathName === '/' ? 'text-blue-700 font-bold' : 'text-gray-500'}`}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li className="sm:border-none border-solid border-2 border-primary rounded-xl bg-slate-100 p-2 flex items-center justify-center">
            <Link
              href="/shop"
              className={`p-2 w-full text-center ${pathName === '/shop' ? 'text-blue-700 font-bold' : 'text-gray-500'}`}
              onClick={closeMenu}
            >
              Shop
            </Link>
          </li>
          <li className="sm:border-none border-solid border-2 border-primary rounded-xl bg-slate-100 p-2 flex items-center justify-center ">
            <Link
              href="/contact"
              className={`p-2 w-full text-center ${pathName === '/contact' ? 'text-blue-700 font-bold' : 'text-gray-500'}`}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>
          <li className="sm:border-none border-solid border-2 border-primary rounded-xl bg-slate-100 p-2 flex items-center justify-center ">
            <Link
              href="/review"
              className={`p-2 w-full text-center ${pathName === '/review' ? 'text-blue-700 font-bold' : 'text-gray-500'}`}
              onClick={closeMenu}
            >
              Review
            </Link>
          </li>
        </ul>
        <ul className="flex gap-3 items-center">
          <li>
            {userToken && (
              <div className="flex gap-2 justify-center py-2 px-4 w-full">
                <img src="/icon/ticket.svg" alt="사용자 응모권 갯수" />
                <span className="font-bold">{ticketsCount}</span>
              </div>
            )}
          </li>
          <button
            type="button"
            className="hidden max-sm:flex hover:cursor-pointer"
            onClick={handleNavDropDown}
          >
            메뉴
          </button>
          {userToken ? (
            <div>
              <button type="button" className="py-2 px-4" onClick={handleProfileClick}>
                <img
                  src="/icon/profile.svg"
                  alt="로그인한 사용자 프로필 아이콘"
                  className="w-6 h-auto"
                />
              </button>
              {isPopverOpen && <ProfilePopover onClose={handleClosePopver} />}
            </div>
          ) : (
            <div>
              <GoogleLoginButton />
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
}
