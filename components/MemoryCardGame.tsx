import React from 'react';

export default function MemoryCardGame() {
  return (
    <main className="fixed inset-0 flex items-center justify-center z-[1000] bg-gray-600 bg-opacity-50 ">
      <section className="relative w-auto h-auto flex flex-col items-center bg-white rounded p-6">
        <div className="absolute top-1 right-1"></div>
        <div className="pt-8">메모리 카드 게임</div>
      </section>
    </main>
  );
}
