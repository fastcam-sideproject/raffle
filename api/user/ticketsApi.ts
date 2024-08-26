import baseURL from "../baseURL";

export async function getTickets(userToken : string) {
    try{
        const response = await fetch(`${baseURL}/api/v1/user/tickets`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
            }
        });
        if(!response.ok) {
            throw new Error('티켓 불러오기 실패');
        }
        return response.json();

    } catch(error) {
        console.error('티켓 불러오기 실패', error);
    }
}