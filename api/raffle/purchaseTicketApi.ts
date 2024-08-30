import baseURL from '../baseURL';

/**
 * 응모 상품 구매하기
 * @param userToken
 * @param raffleId
 */
export async function postPurchaseTicketOne(userToken: string, raffleId: string) {
  try {
    const response = await fetch(`${baseURL}/api/v1/raffle/purchase_ticket_one/${raffleId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorMessage = `Error: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }
    return response.json();
  } catch (error) {
    console.error('raffle item 구매 실패', error);
  }
}
