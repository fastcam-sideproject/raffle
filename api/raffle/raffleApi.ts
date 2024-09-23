import baseURL from '../baseURL';

async function getRaffleData(userToken: string) {
  try {
    const response = await fetch(`${baseURL}/api/v1/raffle/all`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`데이터 불러오기 실패: ${response.status} - ${errorText}`);
    }
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`데이터를 불러오는데 실패했습니다: ${error.message}`);
    } else {
      throw new Error('데이터를 불러오는데 실패했습니다. 알 수 없는 오류가 발생했습니다.');
    }
  }
}

async function getPopularRaffleData() {
  try {
    const response = await fetch(`${baseURL}/api/v1/raffle/active/popular`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`데이터 불러오기 실패: ${response.status} - ${errorText}`);
    }
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`데이터를 불러오는데 실패했습니다: ${error.message}`);
    } else {
      throw new Error('데이터를 불러오는데 실패했습니다. 알 수 없는 오류가 발생했습니다.');
    }
  }
}

async function getRaffleDataDetail(raffleId: number) {
  try {
    const response = await fetch(`${baseURL}/api/v1/raffle/active/free/detail/${raffleId}`);
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

async function getNotFreeRaffleDataDetail(raffleId: number) {
  try {
    const response = await fetch(`${baseURL}/api/v1/raffle/active/not_free/detail/${raffleId}`);
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

async function getRaffleNotFreeItem(userToken: string) {
  try {
    const response = await fetch(`${baseURL}/api/v1/raffle/active/not_free`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('raffle item 가져오기 실패');
    }
    return response.json();
  } catch (error) {
    console.error('raffle item 가져오기 실패', error);
  }
}

/**
 *  무료 응모 상품 나타내기
 * @param userToken
 */
async function getRaffleFreeItem(userToken: string) {
  try {
    const response = await fetch(`${baseURL}/api/v1/raffle/active/free`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('raffle item 가져오기 실패');
    }
    return response.json();
  } catch (error) {
    console.error('raffle item 가져오기 실패', error);
  }
}

export {
  getRaffleData,
  getPopularRaffleData,
  getRaffleDataDetail,
  getNotFreeRaffleDataDetail,
  getRaffleNotFreeItem,
  getRaffleFreeItem,
};
