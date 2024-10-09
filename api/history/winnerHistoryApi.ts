import baseURL from '../baseURL';

export async function getWinnerHistory({
  userToken,
  cursor,
  size,
}: {
  userToken: string;
  cursor: number;
  size: number;
}) {
  try {
    const response = await fetch(`${baseURL}/api/v1/winner_history?cursor=${cursor}&size=${size}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('구매 내역 조회 실패');
    }
    return response.json();
  } catch (error) {
    throw error;
  }
}
