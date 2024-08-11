import { useRouter } from 'next/navigation';

export default function navigateToPurchasePage({ raffleId }: { raffleId: string }) {
  const router = useRouter();
  return () => router.push(`/purchase/${raffleId}`);
}
