import { use, useEffect, useRef } from 'react';
import useAuthStore from '../lib/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { getTickets } from '../api/user/ticketsApi';

export default function ProfilePopover({ onClose }: { onClose: () => void }) {
  const logout = useAuthStore((state) => state.logout);
  const userToken = useAuthStore((state) => state.userToken);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('access_token');
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const {data } = useQuery({
    queryKey: ['getTickets'],
    queryFn: () => getTickets(userToken),
  })


  return (
    <div
      ref={popoverRef}
      className="absolute top-14 right-4 w-22 bg-white border border-gray-200 rounded shadow-lg"
    >
      <ul>
        <li>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full py-2 px-4 hover:bg-gray-100"
          >
            로그아웃
          </button>
        </li>
        <li>
          {
            data
          }개
        </li>
      </ul>
    </div>
  );
}
