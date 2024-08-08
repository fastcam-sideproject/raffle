'use client';

import Image from 'next/image';
import Link from 'next/link';
import GoogleLoginButton from '../GoogleLoginButton';
import { useAuthStore } from '../../lib/store/useAuthStore';
import { useState } from 'react';
import { ProfilePopover } from '../ProfilePopover';

export default function HeaderNav() {
  const userToken = useAuthStore((state) => state.userToken);
  const [isPopverOpen, setIsPopverOpen] = useState(false);

  const handleProfileClick = () => {
    setIsPopverOpen(!isPopverOpen);
  };

  const handleClosePopver = () => {
    setIsPopverOpen(false);
  };

  return (
    <header className="w-full bg-slate-100">
      <nav className="flex justify-between items-center px-6 py-4">
        <Image width={100} height={100} src="/image/logo_title.png" alt="Logo_img" />
        <ul className="flex gap-8 text-xl">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/shop">Shop</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contant">Contact</Link>
          </li>
        </ul>
        <ul className="flex gap-3">
          {userToken ? (
            <div>
              <button className="py-3 px-6" onClick={handleProfileClick}>
                <img src="/image/profile.svg" alt="profile_icon" />
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
