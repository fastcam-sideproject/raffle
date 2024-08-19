export type ShippingInfoProp = {
  onAddressChange: (address: string) => void;
};

export type PurchaseAddress = SigunguAndQueryAddress & {
  address: string;
  addressType?: string;
  addressEnglish: string;
  bname: string;
  jibunAddress: string;
  jibunAddressEnglish: string;
  roadAddress: string;
  sido: string;
  sigu: string;
  detail: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

type SigunguAndQueryAddress = {
  sigungu: string;
  query: string;
};
