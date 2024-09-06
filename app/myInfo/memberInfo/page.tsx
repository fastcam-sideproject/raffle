'use client';

import AddressForm from '../../../components/AddressForm';
import PhoneNumber from '../../../components/payment/PhoneNumber';
import useOrdererInfo from '../../../lib/hooks/useOrdererInfo';

export default function MemberInfoPage() {
  const { data, isLoading, isError } = useOrdererInfo();

  if (!data) {
    return <>데이터가 없습니다.</>;
  }

  if (isError) {
    return <>에러가 발생했습니다.</>;
  }

  return (
    <main className="flex flex-col items-center justify-center h-[70vh] p-4 sm:p-8">
      <section className="w-full bg-white p-8 rounded shadow-md  max-w-md sm:max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">회원 정보</h1>
        {data.phoneNumber ? <p>{data.phoneNumber}</p> : <PhoneNumber />}
        <AddressForm />
      </section>
    </main>
  );
}
