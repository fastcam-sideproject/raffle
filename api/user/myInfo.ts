import baseURL from '../baseURL';

export async function getMyInfo(userToken: string) {
  try {
    const response = await fetch(`${baseURL}/api/v1/user/mypage`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      console.error('마이페이지 불러오기 실패', response);
    }
    return response.json();
  } catch (error) {
    console.error('마이페이지 불러오기 실패', error);
  }
}
