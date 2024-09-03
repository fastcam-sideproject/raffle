import baseUrl from '../baseURL';

export async function getMyPage(userToken: string) {
  try {
    const response = await fetch(`${baseUrl}/api/v1/user/mypage`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('마이페이지 불러오기 실패');
    }
    return response.json();
  } catch (error) {
    console.error('마이페이지 불러오기 실패', error);
  }
}
