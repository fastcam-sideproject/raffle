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

export type PopularItem = ItemData & {
  winner: string;
  status: string;
};

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
  raffleId: number;
  status: string;
  winner: string;
}

export type RaffleItem = {
  ticketPrice: number;
  item: {
    name: string;
    description: string;
    imageUrl: string;
  };
};

export type RaffleItemConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemImageUrl: string;
};

export type DeatilItem = {
  item: {
    name: string;
    imageUrl: string;
    imageList: [];
  };
  totalCount: number;
  currentCount: number;
};

export type ItemCompleteProps = {
  onClose: () => void;
  winner: { nickname: string; phoneNumber: string; userId: string };
  imageUrl: string;
  name: string;
};
