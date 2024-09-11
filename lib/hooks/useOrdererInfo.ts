import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getMyInfo } from '../../api/user/myInfo';

/**
 * 사용자의 정보를 가져오는 커스텀 훅
 * @returns 사용자 정보 및 인증토큰
 */
export default function useOrdererInfo() {
  const [userToken, setUserToken] = useState<string | null>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('access_token');
      setUserToken(token);
    }
  }, []);

  const queryResult = useQuery({
    queryKey: ['ordererInfo'],
    queryFn: () => {
      if (userToken) {
        return getMyInfo(userToken);
      }
      return Promise.reject(new Error('인증 토큰이 없습니다.'));
    },
    staleTime: 1000 * 60,
  });

  return {
    ...queryResult,
    userToken,
  };
}
