import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getMyPage } from '../../api/user/mypageApi';

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
        return getMyPage(userToken);
      }
      return Promise.reject('인증 토큰이 없습니다.');
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...queryResult,
    userToken,
  };
}
