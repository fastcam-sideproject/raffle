import { useEffect, useRef } from 'react';
import { useAuthStore } from '../lib/store/useAuthStore';

export function ProfilePopover({ onClose }) {
  const logout = useAuthStore((state) => state.logout);
  const popoverRef = useRef(null);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('access_token');
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={popoverRef}
      className="absolute top-14 right-4 w-22 bg-white border border-gray-200 rounded shadow-lg"
    >
      <ul>
        <li>
          <button onClick={handleLogout} className="w-full py-2 px-4  hover:bg-gray-100">
            로그아웃
          </button>
        </li>
      </ul>
    </div>
  );
}
