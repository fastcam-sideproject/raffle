import baseURL from '../baseURL';

/**
 * 인증 토큰 만료되면 refresh 토큰을 이용하여 새로운 인증 토큰을 발급받는 API
 * @param {string} refreshToken
 * @returns
 */
export async function refreshApi(refreshToken: string) {
  try {
    const response = await fetch(`${baseURL}/api/v1/login/refresh?refreshToken=${refreshToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('토큰 갱신 실패');
    }
    return response.json();
  } catch (error) {
    console.error('토큰 갱신 실패', error);
  }
}
