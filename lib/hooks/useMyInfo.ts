import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getMyInfo } from '../../api/user/myInfoApi';
import useAuthStore from '../store/useAuthStore';
import { getMyInfoResponse } from '../types/user';

/**
 * @description 사용자의 정보를 나타내는 커스텀 훅
 * @returns {object} queryResult
 * @returns {string} userToken
 */
export default function useMyInfo(): UseQueryResult<getMyInfoResponse, Error> & {
  userToken: string;
} {
  const router = useRouter();
  const userToken = useAuthStore<string>((state) => state.userToken);

  const queryResult = useQuery({
    queryKey: ['getMyInfo'],
    queryFn: async () => {
      if (userToken) {
        const data = await getMyInfo(userToken);
        if (data?.error === '401') {
          router.push('/');
          return Promise.reject(new Error('인증 토큰이 만료되었습니다.'));
        }
        return data;
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
