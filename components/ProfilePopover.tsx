import {  useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '../lib/store/useAuthStore';
import { getTickets } from '../api/user/ticketsApi';

export default function ProfilePopover({ onClose }: { onClose: () => void }) {
  const logout = useAuthStore((state) => state.logout);
  const userToken = useAuthStore((state) => state.userToken);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('access_token');
    onClose();
  };

  const { data } = useQuery({
    queryKey: ['getTickets'],
    queryFn: () => getTickets(userToken),
  });

  return (
    <div
      ref={popoverRef}
      className="absolute top-14 right-3 w-28 bg-white border border-gray-200 rounded shadow-lg"
    >
      <ul>
        <li>
          <div className="flex gap-2 justify-center py-2 px-4 w-full ">
            <img src="/image/ticket.svg" alt="사용자 응모권 갯수" />
            <span>{data}개</span>
          </div>
        </li>
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
