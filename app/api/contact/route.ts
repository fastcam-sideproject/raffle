import { sendEmail } from '../email';

// eslint-disable-next-line import/prefer-default-export
export async function POST(request: Request) {
  const body = await request.json();
  return sendEmail(body)
    .then(
      () =>
        new Response(JSON.stringify({ message: '메일을 성공적으로 보냈음' }), {
          status: 200,
        }),
    )
    .catch(() => {
      return new Response(JSON.stringify({ message: '메일 전송에 실패함' }), {
        status: 500,
      });
    });
}
