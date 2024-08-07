'use client';

import { useRouter } from 'next/navigation';

export default function GoogleLoginButton() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('http://allyouraffle.co.kr/oauth2/authorization/google');
  };

  return (
    <button
      onClick={handleLogin}
      className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      구글로 로그인
    </button>
  );
}
