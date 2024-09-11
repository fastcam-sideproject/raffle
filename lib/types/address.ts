import { DaumPostcodeAddress } from './purchase';

export type AddressFormProps = {
  address: string;
  detailAddress: string;
  isPostcodeOpen: boolean;
  setIsPostcodeOpen: (value: boolean) => void;
  handleComplete: (data: DaumPostcodeAddress) => void;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegisterAddress: () => void;
};
