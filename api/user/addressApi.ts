import { PurchaseAddress } from '../../lib/types/purchase';
import baseUrl from '../baseURL';

export async function postAddress(addressData: PurchaseAddress, useToken: string) {
  try {
    const response = await fetch(`${baseUrl}/api/v1/user/set_address`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${useToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addressData),
    });
    if (!response.ok) {
      throw new Error('주소 등록 실패');
    }
    return response;
  } catch (error) {
    console.error('주소 등록 실패', error);
  }
}
