import Image from 'next/image';
import Link from 'next/link';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Key } from 'react';
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
      <div className="flex gap-8 p-8">
        <Image width={500} height={200} src={detailData.item.imageUrl} alt={detailData.item.name} />
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-[1.2rem]">{detailData.item.name}</h2>
          <div>
            <div>채워야 하는 티켓 수 : {detailData.totalCount}</div>
            <div>채워진 티켓 수 : {detailData.currentCount}</div>
            <div>완료율 : {percentageComplete}</div>
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
        (image: { id: Key | null | undefined; imageUrl: string | StaticImport }) => (
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
