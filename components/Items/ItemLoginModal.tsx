import Button from '../../lib/common/Button';

export default function ItemLoginModal({ onClose }: any) {
  return (
    <main className="fixed inset-0 z-[1050] bg-gray-600 bg-opacity-40 flex flex-col items-center justify-center">
      <section className="w-[90%] max-h-[90%] sm:w-[75%] md:w-[60%] lg:w-[45%] flex flex-col gap-8 items-center bg-white rounded shadow-lg p-8">
        <h2 className="text-lg md:text-xl font-bold text-center text-gray-500">로그인 해주세요!</h2>
        <div>오른쪽 상단에서 로그인 해주세요 !</div>
        <Button
          type="button"
          ariaLabel="닫기"
          label="닫기"
          fontSize="base"
          width="1/6"
          onClick={onClose}
          className="text-white font-bold bg-primary hover:bg-blue-500"
        />
      </section>
    </main>
  );
}
