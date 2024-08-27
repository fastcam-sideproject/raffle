'use client';

import { useState } from 'react';
import Item from './Item';
import ItemManual from './ItemManual';
import Button from '../../lib/common/Button';

function ItemGrid() {
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'COMPLETED'>('ALL');
  const [isManualOpen, setIsManualOpen] = useState(false);

  const handleManualOpen = () => {
    setIsManualOpen(!isManualOpen);
  };

  return (
    <>
      <div className="flex items-center justify-between w-11/12 mb-8 px-10">
        <ul className="flex gap-4">
          <button
            type="button"
            className={`px-4 py-2 ${filter === 'ALL' ? 'bg-primary text-white rounded font-bold' : ''}`}
            onClick={() => setFilter('ALL')}
          >
            전체보기
          </button>
          <button
            type="button"
            className={`px-4 py-2 ${filter === 'ACTIVE' ? 'bg-primary text-white rounded font-bold' : ''}`}
            onClick={() => setFilter('ACTIVE')}
          >
            진행중
          </button>
          <button
            type="button"
            className={`px-4 py-2 ${filter === 'COMPLETED' ? 'bg-primary text-white rounded font-bold' : ''}`}
            onClick={() => setFilter('COMPLETED')}
          >
            종료
          </button>
        </ul>
        <Button
          ariaLabel="래플 이용방법"
          fontSize="1rem"
          label="래플 이용 방법 "
          type="button"
          width=""
          onClick={handleManualOpen}
          className="bg-primary hover:bg-blue-500"
        />
        {isManualOpen && <ItemManual onClose={handleManualOpen} />}
      </div>
      <ul className="w-4/5 grid grid-cols-4 gap-4 items-center max-lg:grid-cols-2 max-sm:grid-cols-1">
        <Item key={filter} filter={filter} />
      </ul>
    </>
  );
}

export default ItemGrid;
