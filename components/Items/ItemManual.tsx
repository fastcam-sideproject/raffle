'use client';

import Button from '../../lib/common/Button';
import { ItemManualProps } from '../../lib/types/item';

export default function ItemManual({ onClose }: ItemManualProps) {
  return (
    <main className="fixed inset-0 z-[1050] bg-gray-600 bg-opacity-40 flex flex-col items-center justify-center">
      <section className="w-11/12 md:w-4/5 lg:w-3/5 h-auto max-h-[90%] flex flex-col gap-6 justify-center items-center bg-white rounded-lg p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-center text-gray-500">래플 이용 방법</h2>
        <div className="w-full flex flex-col gap-2">
          <div className="shadow-custom-light w-full bg-primary p-4 text-lg text-center font-bold rounded-lg text-shadow-white-shadow">
            광고래플 응모 방법
          </div>
          <div className="w-full bg-gray-50 p-4">
            <b>1. 물건을 보시기 전 회원 가입 / 로그인을 해주세요</b> <br />
            별도의 회원 가입 / 로그인 없이 구글 아이디만 있으면 됩니다! 상단에 구글 로그인 버튼
            클릭!
          </div>
          <div className="w-full bg-gray-50 p-4">
            <b>2. 마음에 드는 물건의 래플을 광고로 얻은 티켓으로 응모해주세요!</b> <br />
            중복 응모도 가능합니다!
          </div>
          <div className="w-full bg-gray-50 p-4">
            <b>3. 래플을 응모 하실 때 주소 / 전화번호 를 작성해 주시고 결제하면 응모 완료!</b>
          </div>
        </div>
        <Button
          type="button"
          ariaLabel="닫기"
          label="닫기"
          fontSize=""
          width="auto"
          onClick={onClose}
          className="bg-primary w-1/6 hover:bg-blue-500"
        />
      </section>
    </main>
  );
}
