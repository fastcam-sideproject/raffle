import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../lib/store/useAuthStore';
import Button from '../lib/common/Button';

export default function ProfilePopover({ onClose }: { onClose: () => void }) {
  const logout = useAuthStore((state) => state.logout);
  const popoverRef = useRef<HTMLDivElement>(null);
  const router = useRouter();


  const handleLogout = () => {
    logout();
    localStorage.removeItem('access_token');
    onClose();
  };

  const handleMypageNavigation = () => {
    router.push('/mypage');
    onClose();
  };


  return (
    <div
      ref={popoverRef}
      className="absolute top-14 right-3 w-28 bg-white border border-gray-200 rounded shadow-lg"
    >
      <ul>
        <li>
          <Button
            type='button'
            label='로그아웃'
            onClick={handleLogout}
            className='text-black py-2 px-4 bg-gray-100 hover:bg-gray-200 '
            width='full'
            fontSize='base'
          />
        </li>
        <li>
          <Button
            type='button'
            label='나의 정보'
            onClick={handleMypageNavigation}
            className='text-black py-2 px-4 bg-gray-100 hover:bg-gray-200 '
            width='full'
            fontSize='base'
          />
        </li>
      </ul>
    </div>
  );
}
