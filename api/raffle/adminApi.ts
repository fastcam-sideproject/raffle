import baseUrl from '../baseURL';

export async function postRaffleItem(adminToken: string, data: FormData) {
  try {
    const response = await fetch(`${baseUrl}/api/v1/item/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
      body: data,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(`raffle item 등록 실패: ${errorResponse.message || response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error posting item:', error instanceof Error ? error.message : error);
    throw error;
  }
}
