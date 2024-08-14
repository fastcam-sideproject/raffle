'use client';

import { useState } from 'react';
import Item from './Item';

function ItemGrid() {
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'COMPLETED'>('ALL');

  return (
    <>
      <ul className="mb-4 flex gap-4">
        <button
          type="button"
          className={`px-4 py-2 ${filter === 'ALL' ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => setFilter('ALL')}
        >
          전체보기
        </button>
        <button
          type="button"
          className={`px-4 py-2 ${filter === 'ACTIVE' ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => setFilter('ACTIVE')}
        >
          진행중
        </button>
        <button
          type="button"
          className={`px-4 py-2 ${filter === 'COMPLETED' ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => setFilter('COMPLETED')}
        >
          종료
        </button>
      </ul>
      <ul className="w-4/5 grid grid-cols-4 gap-4 items-center max-lg:grid-cols-2 max-sm:grid-cols-1">
        <Item key={filter} filter={filter} />
      </ul>
    </>
  );
}

export default ItemGrid;
