import { VerifyPhoneResponse } from '../../lib/types/phone';
import baseURL from '../baseURL';

/**
 * @description 전화번호를 DB에 저장하는 API
 * @param {string} phoneNumber
 * @param {string} userToken
 */
async function postPhoneNumber({
  phoneNumber,
  userToken,
}: {
  phoneNumber: string;
  userToken: string;
}): Promise<Response> {
  try {
    const response = await fetch(`${baseURL}/api/v1/user/set_phoneNumber`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
      }),
    });
    if (!response.ok) {
      throw new Error('전화번호 등록 실패');
    }
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * @description 전화번호 인증번호를 요청하는 API
 * @param {string} phoneNumber
 * @param {string} userToken
 */
async function postVerifyPhone({
  phoneNumber,
  userToken,
}: {
  phoneNumber: string;
  userToken: string;
}): Promise<VerifyPhoneResponse> {
  try {
    const response = await fetch(`${baseURL}/api/v1/login/verify_phone`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
      }),
    });

    if (!response.ok) {
      throw new Error('휴대폰 인증번호 요청 실패');
    }
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export { postPhoneNumber, postVerifyPhone };
