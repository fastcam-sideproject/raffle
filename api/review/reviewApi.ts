import baseURL from '../baseURL';

/**
 * @description 모든 리뷰 목록 불러오는 API 함수
 */
async function getAllReviewList({ userToken, size = 5 }: { userToken: string; size?: number }) {
  try {
    const response = await fetch(`${baseURL}/api/v1/reviews?size=${size}`, {
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

/**
 * @description 응모 상품 당첨자 리뷰 작성 API 함수
 */
async function createUserReview({
  userToken,
  reviewData,
}: {
  userToken: string;
  reviewData: {
    title: string;
    description: string;
    imageUrl: string;
  };
}) {
  try {
    const params = new URLSearchParams();
    Object.entries(reviewData).forEach(([key, value]) => {
      params.append(key, value);
    });

    console.log(params);

    const response = await fetch(`${baseURL}/api/v1/user/reviews?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('리뷰 작성 실패');
    }
    console.log(response);
    return response;
  } catch (error) {
    console.error('리뷰 작성 실패', error);
    throw error;
  }
}

async function getUserReviewList({ size = 5, userToken }: { size?: number; userToken: string }) {
  try {
    const response = await fetch(`${baseURL}/api/v1/user/reviews?&size=${size}`, {
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

export { createUserReview, getAllReviewList, getUserReviewList };
