import useMyInfo from '../../lib/hooks/useMyInfo';
import PhoneNumber from './PhoneNumber';

export default function OrdererInfo() {
  const { data, isLoading, isError } = useMyInfo();

  if (isLoading) {
    return <p>주문자 정보를 불러오는 중입니다.</p>;
  }

  if (!data) {
    return <p>주문자 정보가 없습니다.</p>;
  }

  if (isError) {
    return <p>주문자 정보를 불러오는데 실패했습니다.</p>;
  }

  return (
    <section className="border p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-4">주문자 정보</h2>
      <div className="space-y-1 text-lg">
        <p>{data.name}</p>
        <p>{data.email}</p>
        <p>{data.phoneNumber}</p>
      </div>
    </section>
  );
}
