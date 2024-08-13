export interface ItemProps {
  name: string;
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
