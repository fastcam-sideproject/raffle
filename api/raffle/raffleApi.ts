import baseURL from '../baseURL';

async function getRaffleData({ queryKey }) {
  const [, userToken] = queryKey;
  try {
    const response = await fetch(`${baseURL}/api/v1/raffle/all`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  } catch (error) {
    throw new Error('데이터를 불러오는데 실패했습니다.', error);
  }
}

async function postPurchaseRaffle({
  raffleId,
  userToken,
}: {
  raffleId: string;
  userToken: string;
}) {
  try {
    const response = await fetch(`${baseURL}/api/v1/raffle/purchase/${raffleId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('raffle item 구매 실패');
    }
    return response.json();
  } catch (error) {
    console.error('raffle item 구매 실패', error);
  }
}

export { getRaffleData, postPurchaseRaffle };
