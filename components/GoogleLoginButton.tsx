'use client';

import { useRouter } from 'next/navigation';
import baseURL from '../api/baseURL';

export default function GoogleLoginButton() {
  const router = useRouter();

  const handleLogin = () => {
    router.push(`${baseURL}/oauth2/authorization/google`);
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="flex items-center text-lg  border py-2 px-4 gap-2 bg-white text-black rounded hover:bg-gray-100 transition-colors"
    >
      <img src="/image/google_logo.svg" alt="구글 로그인 아이콘" />
      <span>Sign in with Google</span>
    </button>
  );
}
