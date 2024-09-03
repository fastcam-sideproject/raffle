import { useRouter } from 'next/navigation';
import Image from 'next/image';
import baseURL from '../../api/baseURL';

export default function GoogleLoginButton() {
  const router = useRouter();

  const handleLogin = () => {
    router.push(`${baseURL}/test/login/google`);
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="flex items-center text-lg  border py-2 px-4 gap-2 bg-white text-black rounded hover:bg-gray-100 transition-colors"
    >
      <Image width={200} height={200} src="/image/logo/google_logo.svg" alt="구글 로그인 아이콘" className='w-[20px] h-[20px]'/>
      <span className="max-sm:hidden">Sign in with Google</span>
    </button>
  );
}
