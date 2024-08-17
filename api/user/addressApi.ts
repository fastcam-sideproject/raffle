import baseURL from '../baseURL';

async function postAddress() {
  try {
    const response = await fetch(`${baseURL}/api/v1/user/set_address`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      throw new Error('주소 등록 실패');
    }
    return response.json();
  } catch (error) {
    console.error('주소 등록 실패', error);
  }
}

export { postAddress };
