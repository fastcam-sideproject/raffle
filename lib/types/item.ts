type WinnerUser = {
  nickname: string;
  phoneNumber: string;
  userId: string;
};

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
  winner: WinnerUser;
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
  winner: WinnerUser;
}

type Item = {
  name: string;
  imageUrl: string;
};

export type RaffleItem = {
  ticketPrice: number;
  item: Item & {
    description: string;
  };
};

export type RaffleItemConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemImageUrl: string;
};

export type DeatilItem = {
  item: Item & {
    imageList: [];
  };
  totalCount: number;
  currentCount: number;
};

export type ItemCompleteProps = {
  onClose: (event: React.MouseEvent) => void;
  winner: WinnerUser;
  imageUrl: string;
  name: string;
};
