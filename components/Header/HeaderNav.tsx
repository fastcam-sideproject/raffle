'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import GoogleLoginButton from '../GoogleLoginButton';
import { useAuthStore } from '../../lib/store/useAuthStore';
import ProfilePopover from '../ProfilePopover';

export default function HeaderNav() {
  const userToken = useAuthStore((state) => state.userToken);
  const [isPopverOpen, setIsPopverOpen] = useState(false);
  const [toggle, setToggle] = useState(false);

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
    <header className="w-full bg-slate-100 sticky top-0">
      <nav className="flex justify-between items-center px-6 py-4">
        <Image width={100} height={100} src="/image/logo/logo_title.png" alt="Logo_img" />
        <ul
          className={`${
            toggle ? 'absolute w-full top-16 left-0 flex flex-col p-5 gap-1' : 'max-sm:hidden'
          } sm:flex sm:gap-3 sm:static sm:flex-row sm:w-auto sm:p-0`}
        >
          <li className="bg-slate-100 p-2 flex items-center justify-center">
            <Link href="/" className="p-2 w-full text-center" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className="bg-slate-100 p-2 flex items-center justify-center">
            <Link href="/shop" className="p-2 w-full text-center" onClick={closeMenu}>
              Shop
            </Link>
          </li>
          <li className="bg-slate-100 p-2 flex items-center justify-center">
            <Link href="/about" className="p-2 w-full text-center" onClick={closeMenu}>
              About
            </Link>
          </li>
          <li className="bg-slate-100 p-2 flex items-center justify-center">
            <Link href="/contact" className="p-2 w-full text-center" onClick={closeMenu}>
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
              <button type="button" className="py-3 px-6" onClick={handleProfileClick}>
                <img src="/image/profile.svg" alt="로그인한 사용자 프로필 아이콘" />
              </button>
              {isPopverOpen && <ProfilePopover onClose={handleClosePopver} />}
            </div>
          ) : (
            <div className="py-3 px-4">
              <GoogleLoginButton />
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
}
