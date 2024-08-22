import React from 'react';
import Button from '../../lib/common/Button';

interface EmailPopUpProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function EmailPopUp({ onClose, children }: EmailPopUpProps) {
  return (
    <main className="fixed inset-0 z-50 bg-gray-600 bg-opacity-40 flex flex-col items-center justify-center">
      <section className="w-11/12 md:w-4/5 lg:w-3/5 h-auto max-h-[90%] flex flex-col gap-6 justify-center items-center bg-white rounded-lg p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-center text-gray-500">알림</h2>
        <div className="w-full flex flex-col justify-center items-center gap-2">{children}</div>
        <Button
          width=""
          fontSize=""
          type="button"
          ariaLabel="닫기"
          label="닫기"
          onClick={onClose}
          className="bg-primary w-1/6 hover:bg-blue-500"
        />
      </section>
    </main>
  );
}
