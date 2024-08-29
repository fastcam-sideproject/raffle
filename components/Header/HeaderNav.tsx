'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import GoogleLoginButton from '../GoogleLoginButton';

import ProfilePopover from '../ProfilePopover';
import useAuthStore from '../../lib/store/useAuthStore';

export default function HeaderNav() {
  const userToken = useAuthStore((state) => state.userToken);
  const [isPopverOpen, setIsPopverOpen] = useState(false);
  const [toggle, setToggle] = useState(false);

  const pathName = usePathname();
  const hideHeaderRoutes = /^\/purchase\/\w+$/;

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

  if (hideHeaderRoutes.test(pathName)) {
    return null;
  }

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
          <li className="sm:border-none border-solid border-2 border-primary rounded-xl bg-slate-100 p-2 flex items-center justify-center">
            <Link
              href="/about"
              className={`p-2 w-full text-center ${pathName === '/about' ? 'text-blue-700 font-bold' : 'text-gray-500'}`}
              onClick={closeMenu}
            >
              About
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
        </ul>
        <ul className="flex gap-3 items-center">
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
                <img src="/image/profile.svg" alt="로그인한 사용자 프로필 아이콘" />
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
