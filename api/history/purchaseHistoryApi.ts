import { PurchaseHistoryResponse } from '../../lib/types/purchase';
import baseURL from '../baseURL';

export async function getPurchaseHistory({
  userToken,
  offset,
  size,
}: {
  userToken: string;
  offset: number;
  size: number;
}): Promise<PurchaseHistoryResponse> {
  try {
    const response = await fetch(
      `${baseURL}/api/v1/purchase_history?offset=${offset}&size=${size}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    if (!response.ok) {
      throw new Error('구매 내역 조회 실패');
    }
    return response.json();
  } catch (error) {
    throw error;
  }
}
