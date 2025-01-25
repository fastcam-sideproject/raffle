import { AxiosResponse } from 'axios';
import { client } from '../http';

/**
 * @description 유저의 응모권 갯수 가져오기
 */
const getTickets = async (): Promise<number> => {
  try {
    const response = await client.get('/api/v1/user/tickets');
    return response.data;
  } catch (error) {
    console.log('응모권 불러오기 실패:', error);
    throw error;
  }
};

/**
 * @description 유저의 으옹권 갯수 +1 추가하기
 */
const postTicketsPlusOne = async (): Promise<AxiosResponse<number>> => {
  try {
    return await client.post('/api/v1/user/tickets/plus_one');
  } catch (error) {
    console.log('응모권 추가 실패:', error);
    throw error;
  }
};

export { getTickets, postTicketsPlusOne };
