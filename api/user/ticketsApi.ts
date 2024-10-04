import useAuthStore from '../../lib/store/useAuthStore';
import baseURL from '../baseURL';

/**
 * 유저의 응모권 갯수 가져오기
 * @param userToken
 */
async function getTickets(userToken: string): Promise<number> {
  const { logout } = useAuthStore.getState();
  try {
    const response = await fetch(`${baseURL}/api/v1/user/tickets`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (response.status === 401) {
      console.error('인증 실패: 토큰이 만료되었습니다.');
      logout();
    }
    if (!response.ok) {
      throw new Error('응모권 불러오기 실패');
    }
    return response.json();
  } catch (error) {
    throw new Error(`응모권 불러오기 실패: ${error}`);
  }
}

async function postTicketsPlusOne(userToken: string): Promise<number> {
  try {
    const response = await fetch(`${baseURL}/api/v1/user/tickets/plus_one`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('티켓 추가 실패');
    }
    return response.json();
  } catch (error) {
    throw new Error(`티켓 추가 실패: ${error}`);
  }
}

export { getTickets, postTicketsPlusOne };
