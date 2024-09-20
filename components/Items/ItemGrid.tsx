'use client';

import { useState } from 'react';
import Item from './Item';
import ItemManual from './ItemManual';
import Button from '../../lib/common/Button';
import { KakaoAdFit } from '../KakaoAdFit';

export default function ItemGrid() {
  const [filter, setFilter] = useState<'ALL' | 'FREE' | 'NOT_FREE' | 'COMPLETED'>('ALL');
  const [isManualOpen, setIsManualOpen] = useState<boolean>(false);

  const handleManualOpen = (): void => {
    setIsManualOpen(!isManualOpen);
  };

  return (
    <>
      <section className="flex gap-4 max-lg:flex-col max-lg:items-center relative">
        <aside className="hidden absolute top-[7.5rem] -left-[15%] lg:flex">
          <KakaoAdFit unit="DAN-OUyn7VXgiTbP3fFn" width="160" height="600" disabled={false} />
        </aside>

        <ul className="w-auto">
          <nav className="flex w-full justify-between items-center my-4 py-4 px-4">
            <ul className="flex gap-4">
              {/* <button
            type="button"
            className={`px-4 py-2 ${filter === 'ALL' ? 'bg-primary text-white rounded font-bold' : ''}`}
            onClick={() => setFilter('ALL')}
          >
            전체보기
          </button> */}
              <button
                type="button"
                className={`px-4 py-2 ${filter === 'FREE' ? 'bg-primary text-white rounded font-bold' : 'border-solid border-b-[2px] border-primary hover:bg-primary hover:text-white hover:rounded hover:font-bold'}`}
                onClick={() => setFilter('FREE')}
              >
                무료
              </button>
              <button
                type="button"
                className={`px-4 py-2 ${filter === 'NOT_FREE' ? 'bg-primary text-white rounded font-bold' : 'border-solid border-b-[2px] border-primary hover:bg-primary hover:text-white hover:rounded hover:font-bold'}`}
                onClick={() => setFilter('NOT_FREE')}
              >
                유료
              </button>
              <button
                type="button"
                className={`px-4 py-2 ${filter === 'COMPLETED' ? 'bg-primary text-white rounded font-bold' : 'border-solid border-b-[2px] border-primary hover:bg-primary hover:text-white hover:rounded hover:font-bold'}`}
                onClick={() => setFilter('COMPLETED')}
              >
                완료
              </button>
            </ul>
            <Button
              ariaLabel="래플 이용방법"
              fontSize="1rem"
              label="래플 이용 방법"
              type="button"
              width="auto"
              onClick={handleManualOpen}
              className="text-white font-bold bg-primary hover:bg-blue-500"
            />
            {isManualOpen && <ItemManual onClose={handleManualOpen} />}
          </nav>
          <ul className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
            <Item key={filter} filter={filter} />
          </ul>
        </ul>
        <aside className="hidden absolute top-[7.5rem] -right-[28%] lg:flex">
          <KakaoAdFit unit="DAN-qvc3rvDUKVUobMDZ" width="300" height="250" disabled={false} />
        </aside>
      </section>
    </>
  );
}
