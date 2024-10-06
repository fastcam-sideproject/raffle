'use client';

import Image from 'next/image';
import Link from 'next/link';
import useAdminItemList from '../../lib/hooks/useAdminItemList';
import Button from '../../lib/common/Button';

export default function AdminItemList() {
  const { data, isError, error, isLoading } = useAdminItemList();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  if (!data || data.length === 0) return <div>No items available</div>;
  console.log(data);
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
                <span className="text-primary">래플 응모중</span>
              ) : (
                <span className="text-error">래플 종료</span>
              )}
            </span>
            <div className="flex gap-4">
              <Button
                type="button"
                label="래플 시작"
                width="auto"
                fontSize=""
                className="bg-primary text-white"
              />
              <Button
                type="button"
                label="래플 종료"
                width="auto"
                fontSize=""
                className="bg-secondary text-white"
              />
              <Button
                type="button"
                label="래플 삭제"
                width="auto"
                fontSize=""
                className="bg-error text-white"
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
