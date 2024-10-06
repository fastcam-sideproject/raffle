import baseURL from '../baseURL';

async function postRaffleItem(adminToken: string, data: FormData) {
  try {
    const response = await fetch(`${baseURL}/api/v1/item/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      body: data,
    });

    if (!response.ok) {
      const errorResponse = await response.json().catch(() => ({
        message: 'Unknown error',
      }));
      throw new Error(`raffle item 등록 실패: ${errorResponse.message || response.status}`);
    }
    return response;
  } catch (error) {
    console.error('Error posting item:', error instanceof Error ? error.message : error);
    throw error;
  }
}

async function getAdminRaffleItem(adminToken: string) {
  try {
    const response = await fetch(`${baseURL}/api/v1/item`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json().catch(() => ({
        message: 'Unknown error',
      }));
      throw new Error(`raffle item 불러오기 실패: ${errorResponse.message || response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error get item:', error instanceof Error ? error.message : error);
    throw error;
  }
}

async function getAdminRaffleItemDetail(adminToken: string, raffleId: number) {
  try {
    const response = await fetch(`${baseURL}/api/v1/item/${raffleId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`데이터를 불러오는데 실패했습니다: ${error.message}`);
    } else {
      console.log('데이터를 불러오는데 실패했습니다. 알 수 없는 오류가 발생했습니다.', error);
    }
  }
}

async function postAdminRaffleStart(adminToken: string, raffleId: number) {
  try {
    const response = await fetch(`${baseURL}/api/v1/item/start/${raffleId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });
    if (!response.ok) {
      const errorResponse = await response.json().catch(() => ({
        message: 'Unknown error',
      }));
      throw new Error(`raffle item 등록 실패: ${errorResponse.message || response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error posting item:', error instanceof Error ? error.message : error);
    throw error;
  }
}

async function postAdminRaffleStop(adminToken: string, raffleId: number) {
  try {
    const response = await fetch(`${baseURL}/api/v1/item/stop/${raffleId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });
    if (!response.ok) {
      const errorResponse = await response.json().catch(() => ({
        message: 'Unknown error',
      }));
      throw new Error(`raffle item 등록 실패: ${errorResponse.message || response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error posting item:', error instanceof Error ? error.message : error);
    throw error;
  }
}

async function deleteAdminRaffleItem(adminToken: string, raffleId: number) {
  try {
    const response = await fetch(`${baseURL}/api/v1/item/delete/${raffleId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json().catch(() => ({
        message: 'Unknown error',
      }));
      throw new Error(`raffle item 삭제 실패: ${errorResponse.message || response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting item:', error instanceof Error ? error.message : error);
    throw error;
  }
}

export {
  postRaffleItem,
  getAdminRaffleItem,
  getAdminRaffleItemDetail,
  postAdminRaffleStart,
  postAdminRaffleStop,
  deleteAdminRaffleItem,
};
