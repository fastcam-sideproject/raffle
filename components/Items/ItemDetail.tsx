import Image from 'next/image';
import Link from 'next/link';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { getRaffleDataDetail } from '../../api/raffle/raffleApi';
import Button from '../../lib/common/Button';

/** 상세페이지
 * 이미지
 * 타이틀
 * 내용
 * 응모버튼
 * 황금 올리브 : 24
 */

export default async function ItemDetail({ params: { id } }: { params: { id: string } }) {
  const detailData = await getRaffleDataDetail(id);

  const percentageComplete = ((detailData.currentCount / detailData.totalCount) * 100).toFixed(2);

  return (
    <section className="flex flex-col justify-center items-center">
      <h1>상세페이지</h1>
      <div className="w-[75%] grid grid-cols-2 justify-between gap-8 p-8">
        <Image width={500} height={200} src={detailData.item.imageUrl} alt={detailData.item.name} />
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-[1.2rem]">{detailData.item.name}</h2>
          <div className="border-solid border-[1px] border-primary p-4">
            <div>채워야 하는 티켓 수 : {detailData.totalCount}</div>
            <div>채워진 티켓 수 : {detailData.currentCount}</div>
            <div>완료율 : {percentageComplete}</div>
            <div className="mt-6 w-full bg-gray-300 rounded-full h-3 overflow-hidden ">
              <div
                className={`h-full transition-all duration-300 ${
                  percentageComplete === '100' ? 'bg-secondary' : 'bg-primary'
                }`}
                style={{ width: `${percentageComplete}%` }}
              />
            </div>
          </div>

          <div />
          <Link href={`/purchase/${id}`}>
            <Button
              type="button"
              ariaLabel="응모하기"
              label="응모하기"
              fontSize=""
              width=""
              className="w-full bg-primary hover:bg-blue-500"
            />
          </Link>
        </div>
      </div>
      {detailData.item.imageList.map(
        (image: { id: string | null | undefined; imageUrl: string | StaticImport }) => (
          <Image
            key={image.id}
            width={1000}
            height={200}
            src={image.imageUrl}
            alt={`${detailData.item.name} image ${image.id}`}
            className="w-[75%] h-auto"
          />
        ),
      )}
    </section>
  );
}
