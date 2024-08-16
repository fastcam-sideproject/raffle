import baseURL from '../baseURL';

async function getRaffleData({ queryKey }: { queryKey: [string, string] }) {
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
    console.error('raffle item 조회 실패', error);
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
