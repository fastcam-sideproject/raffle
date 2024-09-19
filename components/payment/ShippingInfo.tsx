import useMyInfo from '../../lib/hooks/useMyInfo';

export default function ShippingInfo() {
  const { data, isLoading, error } = useMyInfo();

  if (isLoading) {
    return <p>배송 정보를 불러오는 중입니다.</p>;
  }
  if (!data) {
    return <p>배송 정보가 없습니다.</p>;
  }
  if (error) {
    return <p>배송 정보를 불러오는데 실패했습니다.</p>;
  }

  return (
    <section className="border p-4 rounded-md">
      <h2 className="text-2xl font-semibold mb-4">배송 정보</h2>
      {data?.address?.address && (
        <div className="space-y-1 text-lg">
          <p>{data.name}</p>
          <p>{data.phoneNumber}</p>
          <p>{data.address.address}</p>
          <p>{data.address.detail}</p>
          <p>{data.address.postalCode}</p>
        </div>
      )}
    </section>
  );
}
