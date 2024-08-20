import React from 'react';
import PhoneNumber from './PhoneNumber';

export default function OrdererInfo() {
  return (
    <section className="border p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-4">주문자 정보</h2>
      <div className="space-y-2">
        <p>홍길동11</p>
        <PhoneNumber />
      </div>
    </section>
  );
}
