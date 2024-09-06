'use client';

import OrdererInfo from '../../../components/payment/OrdererInfo';

export default function MemberInfoPage() {
  return (
    <main className="flex flex-col items-center justify-center h-[70vh] p-4 sm:p-8">
        <section className="w-full bg-white p-8 rounded shadow-md  max-w-md sm:max-w-2xl">
        <OrdererInfo />
        </section>
    </main>
  );
}
