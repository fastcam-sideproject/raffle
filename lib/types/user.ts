export type UserData = {
  name: string;
  email: string;
  phoneNumber: string;
  address: {
    address: string;
    addressEnglish: string;
    bname: string;
    jibunAddress: string;
    jibunAddressEnglish: string;
    roadAddress: string;
    sido: string;
    sigungu: string;
    query: string;
    detail: string;
  };
};

export type getMyInfoResponse = {
  name: string;
  email: string;
  phoneNumber: string;
  address: {
    address: string;
    addressEnglish: string;
    bname: string;
    jibunAddress: string;
    jibunAddressEnglish: string;
    roadAddress: string;
    sido: string;
    sigungu: string;
    query: string;
    detail: string;
    postalCode: string;
  };
  error?: string;
};
