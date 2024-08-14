export interface ItemData {
  totalCount: number;
  currentCount: number;
  ticketPrice: number;
  status: string;
  item: {
    name: string;
    category: number;
    imageUrl: string;
    description: string;
    defaultTotalCount: number;
    possibleRaffle: boolean;
    id: number;
  };
  id: number;
}

export interface FilterProps {
  filter: string;
}

export interface ItemProps {
  name: string;
  filter: string;
  category: number;
  imageUrl: string;
  currentCount: number;
  totalCount: number;
  raffleId: string;
}

export type RaffleItem = {
  ticketPrice: number;
  item: {
    name: string;
    description: string;
    imageUrl: string;
  };
};
