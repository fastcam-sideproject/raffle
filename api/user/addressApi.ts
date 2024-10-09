import { PurchaseAddress } from '../../lib/types/purchase';
import baseURL from '../baseURL';

export async function postAddress(
  addressData: PurchaseAddress,
  userToken: string,
): Promise<Response> {
  try {
    const response = await fetch(`${baseURL}/api/v1/user/set_address`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addressData),
    });
    if (!response.ok) {
      throw new Error('주소 등록 실패');
    }
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
