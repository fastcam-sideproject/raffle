export type ShippingInfoProp = {
  onAddressChange: (address: string) => void;
};

export type BaseAddress = {
  address: string;
  addressEnglish: string;
  bname: string;
  jibunAddress: string;
  jibunAddressEnglish: string;
  roadAddress: string;
  sido: string;
  sigungu: string;
};

export type PurchaseAddress = BaseAddress & {
  detail: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

export type DaumPostcodeAddress = BaseAddress & {
  addressType: string;
  query: string;
};

/**
 * @description 래플 이력 조회 함수 API 응답 타입
 */
export type PurchaseHistoryResponse = {
  id: number;
  count: number;
  isWinner: boolean;
  raffle: {
    id: number;
    totalCount: number;
    status: string;
    completedDate: string;
    ticketPrice: number;
    item: {
      id: number;
      name: string;
      category: string;
      imageUrl: string;
    };
    winner?: {
      name: string;
    };
  };
}[];
