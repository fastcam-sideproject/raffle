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
