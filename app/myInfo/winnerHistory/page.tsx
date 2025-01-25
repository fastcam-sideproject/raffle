'use client';

import { useQuery } from '@tanstack/react-query';
import { getWinnerHistory } from '../../../api/history/winnerHistoryApi';
import useAuthStore from '../../../lib/store/useAuthStore';

export default function WinnerHistoryPage() {
  const userToken = useAuthStore<string>((state) => state.userToken);

  const {
    data: winnerData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['getWinnerHistory'],
    queryFn: () => getWinnerHistory({ userToken }),
    enabled: !!userToken,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return <div>Error: {error instanceof Error ? error.message : JSON.stringify(error)}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-primary">당첨 내역</h2>
      {winnerData && winnerData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {winnerData.map((winner: any) => (
            <div key={winner.raffle.id} className="bg-white rounded-md shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={winner.raffle.item.imageUrl}
                  alt={winner.raffle.item.name}
                  className="w-full h-60 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{winner.raffle.item.name}</h3>
                <p className="text-gray-600">{winner.raffle.item.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">당첨 내역이 없습니다.</div>
      )}
    </div>
  );
}
