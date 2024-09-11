import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '../../api/user/myInfo';
import useAuthStore from '../store/useAuthStore';

export default function useMyInfo() {
  const userToken = useAuthStore((state) => state.userToken);

  const queryResult = useQuery({
    queryKey: ['getMyInfo'],
    queryFn: async () => {
      if (userToken) {
        return await getMyInfo(userToken);
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
