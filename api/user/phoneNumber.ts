import baseURL from '../baseURL';

async function postPhoneNumber({
  phoneNumber,
  useToken,
}: {
  phoneNumber: string;
  useToken: string;
}) {
  try {
    const response = await fetch(`${baseURL}/api/v1/user/set_phoneNumber`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${useToken}`,
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

export { postPhoneNumber };
