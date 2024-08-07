import Image from 'next/image';
import Link from 'next/link';
import GoogleLoginButton from '../GoogleLoginButton';

export default function HeaderNav() {
  return (
    <header className="w-full bg-slate-100">
      <nav className="flex justify-between items-center px-6 py-4">
        <Image width={100} height={100} src="/image/logo_title.png" alt="Logo img" />
        <ul className="flex gap-8">
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
          <div className="py-3 px-4">
            <GoogleLoginButton />
          </div>
          <button type="button" className="py-3 px-4 bg-blue-400 text-white rounded-lg">
            회원가입
          </button>
        </ul>
      </nav>
    </header>
  );
}
