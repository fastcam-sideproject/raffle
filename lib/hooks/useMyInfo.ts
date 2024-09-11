import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '../../api/user/myInfo';
import useAuthStore from '../store/useAuthStore';

/**
 * 사용자의 정보를 나타내는 커스텀 훅
 * @returns 사용자 정보 및 인증토큰 반환
 */
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
