import { KakaoAdFit } from '../KakaoAdFit';
import useRaffleData from '../../lib/hooks/useRaffleData';

export default function HomeInfo() {
  const { data = [] } = useRaffleData();
  const completedCount = data.filter(
    (item: { status: string }) => item.status === 'COMPLETED',
  ).length;

  return (
    <section className="my-16 bg-blue-50 w-full">
      <div className="flex justify-center items-center gap-10 bg-blue-50 p-6">
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[auto,1fr,1fr,auto] lg:gap-4 w-[90%]">
          <h1 className="col-span-4 border-solid border-b-2 border-blue-700 text-2xl font-semibold">
            알려드립니다
          </h1>
          <div className="col-span-2 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">공지사항</h2>
            <ul className="space-y-2">
              <li className="flex justify-between text-gray-700">
                <span>래플 응모시 주의 사항</span>
                <span className="text-sm text-gray-500">2024.09.06</span>
              </li>
              <li className="flex justify-between text-gray-700">
                <span>즐거운 한가위 보내세요!</span>
                <span className="text-sm text-gray-500">2024.09.06</span>
              </li>
              <li className="flex justify-between text-gray-700">
                <span>추석 기간 배송 공지</span>
                <span className="text-sm text-gray-500">2024.09.06</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-sm font-semibold">고 객 센 터</h3>
            <p className="text-gray-600">0000 - 0000</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-sm font-semibold">누적 당첨자 수</h3>
            <p className="text-gray-600">{completedCount}명</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-sm font-semibold">응모내역 & 당첨결과</h3>
            <p className="text-gray-600">내 주문내역 및 당첨결과를 확인해보세요.</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-sm font-semibold">마이 페이지</h3>
            <p className="text-gray-600">내 정보를 확인하고 변경하세요</p>
          </div>

          <aside className="lg:col-start-4 lg:row-start-2 lg:col-span-1 lg:row-span-2 flex justify-end">
            <KakaoAdFit unit="DAN-OUyn7VXgiTbP3fFn" width="160" height="600" disabled={false} />
          </aside>
        </div>
      </div>
    </section>
  );
}
