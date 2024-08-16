import { useRouter } from 'next/navigation';

/**
 * 구매 페이지로 이동하는 함수
 * @param param raffleId
 * @returns
 */

export default function useNavigateToPurchasePage({ raffleId }: { raffleId: string }) {
  const router = useRouter();

  return () => {
    router.push(`/purchase/${raffleId}`);
  };
}
