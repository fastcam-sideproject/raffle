export interface ItemData {
  isFree: boolean;
  id: number;
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
  status: string;
  winner: string;
}

export interface ItemManualProps {
  onClose: () => void;
}

export type RaffleItem = {
  ticketPrice: number;
  item: {
    name: string;
    description: string;
    imageUrl: string;
  };
};
