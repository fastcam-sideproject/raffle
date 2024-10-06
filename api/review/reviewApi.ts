import baseURL from '../baseURL';

export async function getAllReviewList({
  userToken,
  cursor = 0,
  size = 5,
}: {
  userToken: string;
  cursor?: number;
  size?: number;
}) {
  try {
    const response = await fetch(`${baseURL}/api/v1/reviews?cursor=${cursor}&size=${size}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('리뷰 목록 불러오기 실패');
    }
    return response.json();
  } catch (error) {
    console.error('리뷰 목록 불러오기 실패', error);
    throw error;
  }
}
