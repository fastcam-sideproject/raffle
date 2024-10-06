'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllReviewList } from '../../../api/review/reviewApi';
import useAuthStore from '../../../lib/store/useAuthStore';

export default function ReviewPage() {
  const userToken = useAuthStore<string>((state) => state.userToken);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['getReviewList'],
    queryFn: () =>
      getAllReviewList({
        userToken,
      }),
  });

  console.log(data);

  return <div>ReviewPage</div>;
}
