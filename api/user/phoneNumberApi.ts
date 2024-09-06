import baseUrl from '../baseURL';

async function postPhoneNumber({
  phoneNumber,
}: {
  phoneNumber: string;
}) {
  try {
    const response = await fetch(`${baseUrl}/api/v1/user/set_phoneNumber`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
      }),
    });

    if (!response.ok) {
      throw new Error('전화번호 등록 실패');
    }
    return response;
  } catch (error) {
    console.error('전화번호 등록 실패', error);
  }
}

async function postVerifyPhone({
  phoneNumber,
}: {
  phoneNumber: string;
}) {
  try {
    const response = await fetch(`${baseUrl}/api/v1/login/verify_phone`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
      }),
    });

    if (!response.ok) {
      throw new Error('휴대폰 인증번호 요청 실패');
    }
    return response.json();
  } catch (error) {
    console.error('휴대폰 인증번호 요청 실패', error);
  }
}

export { postPhoneNumber, postVerifyPhone };
