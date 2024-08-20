import PhoneNumber from './PhoneNumber';
import { useQuery } from '@tanstack/react-query';
import { getMyPage } from '../../api/user/mypageApi';
import useAuthStore from '../../lib/store/useAuthStore';

export default function OrdererInfo() {
  const userToken = useAuthStore((state) => state.userToken);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['ordererInfo'],
    queryFn: () => getMyPage(userToken),
    staleTime: 1000 * 60 * 5,
  });

  if (!data || isError) {
    return <p>주문자 정보를 불러오는데 실패했습니다.</p>;
  }

  if (isLoading) {
    return <p>주문자 정보를 불러오는 중입니다.</p>;
  }

  return (
    <section className="border p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-4">주문자 정보</h2>
      <div className="space-y-2 text-lg">
        <p>{data.name}</p>
        <p>{data.email}</p>
        {data.phoneNumber ? <p>{data.phoneNumber}</p> : <PhoneNumber />}
      </div>
    </section>
  );
}
