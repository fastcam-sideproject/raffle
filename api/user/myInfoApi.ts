import baseURL from '../baseURL';
import useAuthStore from '../../lib/store/useAuthStore';
import { getMyInfoResponse } from '../../lib/types/user';

export async function getMyInfo(userToken: string): Promise<getMyInfoResponse> {
  const { logout } = useAuthStore.getState();

  try {
    const response = await fetch(`${baseURL}/api/v1/user/mypage`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`마이페이지 불러오기 실패: ${response.statusText}`);
    }
    if (response.status === 401) {
      console.error('인증 실패: 토큰이 만료되었습니다.');
      logout();
    }
    return response.json();
  } catch (error) {
    throw new Error(`마이페이지 불러오기 실패: ${error}`);
  }
}
