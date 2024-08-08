'use client';

/* eslint-disable import/no-extraneous-dependencies */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ItemStyle from './ItemStyle';

async function fetchRaffleData() {
  const response = await axios.get('http://allyouraffle.co.kr/api/v1/raffle/all');
  return response.data;
}

interface ItemProps {
  name: string;
  category: number;
  imageUrl: string;
  defaultTotalCount: number;
}

function Item() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['shopItems'],
    queryFn: fetchRaffleData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        Error loading data <span>{error.toString()}</span>
      </div>
    );
  }

  return (
    <div>
      {data.items?.map((item: ItemProps) => (
        <ItemStyle
          name={item.name}
          category={item.category}
          imageUrl={item.imageUrl}
          defaultTotalCount={item.defaultTotalCount}
        />
      ))}
    </div>
  );
}

export default Item;
