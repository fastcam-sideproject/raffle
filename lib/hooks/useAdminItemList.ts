/**
 * @description 관리자 페이지에서 등록한 상품들을 처리하는 커스텀 훅
 * @returns {object} queryResult
 */

import { useQuery } from '@tanstack/react-query';
import useAuthStore from '../store/useAuthStore';
import { getAdminRaffleItem } from '../../api/raffle/adminApi';

export default function useAdminItemList() {
  const userToken = useAuthStore((state) => state.userToken);

  const queryResult = useQuery({
    queryKey: ['adminLitmList', userToken],
    queryFn: () => getAdminRaffleItem(userToken),
    enabled: !!userToken,
    staleTime: 1000 * 60 * 5,
  });
  return {
    ...queryResult,
  };
}
