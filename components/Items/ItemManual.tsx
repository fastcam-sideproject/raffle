'use client';

import { ItemManualProps } from '../../lib/types/item';

export default function ItemManual({ onClose }: ItemManualProps) {
  return (
    <main className="fixed inset-0 z-50 bg-gray-600 bg-opacity-40 flex items-center justify-center">
      <section className="w-11/12 md:w-4/5 lg:w-3/5 h-auto max-h-[90%] flex flex-col gap-6 justify-center items-center bg-white rounded-lg p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-center">래플 이용 방법</h2>
        <div className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
          <div>ㅇㅣ제 여기에 이용방법이 들어가요</div>
        </div>
        <button
          aria-label="레플 이용 방법 닫기 버튼"
          type="button"
          className="top-4 right-4 bg-slate-50 p-2 md:p-4 rounded-lg text-xs md:text-base"
          onClick={onClose}
        >
          닫기
        </button>
      </section>
    </main>
  );
}
