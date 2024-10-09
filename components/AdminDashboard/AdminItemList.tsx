'use client';

import Image from 'next/image';
import Link from 'next/link';
import useAdminItemList from '../../lib/hooks/useAdminItemList';
import Button from '../../lib/common/Button';
import useAdminDeleteItem from '../../lib/hooks/useAdminDeleteItem';
import useAdminStartItem from '../../lib/hooks/useAdminStartItem';
import useAdminStopItem from '../../lib/hooks/useAdminStopItem';

export default function AdminItemList() {
  const { data, isError, error, isLoading } = useAdminItemList();

  const startItemMutation = useAdminStartItem();
  const stopItemMutation = useAdminStopItem();
  const deleteItemMutation = useAdminDeleteItem();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  if (!data || data.length === 0) return <div>No items available</div>;

  const handelStartRaffle = (raffleId: number) => {
    if (window.confirm('아이템을 등록 하시겠습니까?')) {
      startItemMutation.mutate(raffleId);
    }
  };

  const handelStopRaffle = (raffleId: number) => {
    if (window.confirm('아이템을 정지 하시겠습니까?')) {
      stopItemMutation.mutate(raffleId);
    }
  };

  const handelDeleteRaffle = (raffleId: number) => {
    if (window.confirm('아이템을 삭제 하시겠습니까?')) {
      deleteItemMutation.mutate(raffleId);
    }
  };

  return (
    <>
      <ul className="w-[100%]">
        <h1>등록 아이템 리스트</h1>
        {data.map((item: any) => (
          <li
            key={item.id}
            className="grid grid-cols-3 gap-4 p-4 items-center border-b hover:bg-gray-50"
          >
            <Link href={`/admin/detail/${item.id}`} className="flex flex-col items-center">
              <Image width={50} height={50} src={item.imageUrl} alt={item.name}></Image>
              <span>{item.name}</span>
            </Link>
            <span>
              {item.possibleRaffle ? (
                <span className="text-primary">사용 가능</span>
              ) : (
                <span className="text-error">사용 불가</span>
              )}
            </span>
            <div className="flex gap-4">
              <Button
                type="button"
                label="래플 시작"
                width="auto"
                fontSize=""
                className="bg-primary text-white"
                onClick={() => handelStartRaffle(item.id)}
              />
              <Button
                type="button"
                label="래플 종료"
                width="auto"
                fontSize=""
                className="bg-secondary text-white"
                onClick={() => handelStopRaffle(item.id)}
              />
              <Button
                type="button"
                label="래플 삭제"
                width="auto"
                fontSize="auto"
                className="bg-error text-white"
                onClick={() => handelDeleteRaffle(item.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
