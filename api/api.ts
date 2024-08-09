import axios from 'axios';
import baseURL from './baseURL';

async function fetchRaffleData({ queryKey }) {
  const [, userToken] = queryKey;
  try {
    const response = await axios.get(`${baseURL}/api/v1/raffle/all`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('데이터를 불러오는데 실패했습니다.', error);
  }
}

export { fetchRaffleData };
