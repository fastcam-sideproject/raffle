import { useRef } from 'react';
import useAuthStore from '../lib/store/useAuthStore';

export default function ProfilePopover({ onClose }: { onClose: () => void }) {
  const logout = useAuthStore((state) => state.logout);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('access_token');
    onClose();
  };

  return (
    <div
      ref={popoverRef}
      className="absolute top-14 right-3 w-28 bg-white border border-gray-200 rounded shadow-lg"
    >
      <ul>
        <li>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full py-2 px-4 hover:bg-gray-100 "
          >
            로그아웃
          </button>
        </li>
      </ul>
    </div>
  );
}
