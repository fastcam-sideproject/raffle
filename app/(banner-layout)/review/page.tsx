'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { createUserReview, getAllReviewList } from '../../../api/review/reviewApi';
import useAuthStore from '../../../lib/store/useAuthStore';

type ReviewData = {
  title: string;
  description: string;
  imageUrl: string;
};

type ReviewListData = {
  data: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
  }[];
};

export default function ReviewPage() {
  const userToken = useAuthStore<string>((state) => state.userToken);

  const [reviewData, setReviewData] = useState<ReviewData>({
    title: '',
    description: '',
    imageUrl: '',
  });

  const {
    data: ReviewListData,
    isLoading,
    error,
    isError,
  } = useQuery<ReviewListData>({
    queryKey: ['getAllReviewList'],
    queryFn: () =>
      getAllReviewList({
        userToken,
      }),
    enabled: !!userToken,
  });

  const mutation = useMutation({
    mutationFn: () => createUserReview({ userToken, reviewData }),
    onSuccess: () => {
      setReviewData({ title: '', description: '', imageUrl: '' });
      alert('리뷰가 성공적으로 등록되었습니다.');
    },
    onError: (error) => {
      alert(`리뷰 등록 실패: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (!userToken) {
    return <div>로그인이 필요합니다.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : JSON.stringify(error)}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-primary">Review Page</h1>
      <div>
        {ReviewListData &&
          ReviewListData?.data.map((review) => (
            <div key={review.id}>
              <p>{review.id}번</p>
              이미지:
              {review.imageUrl && <img src={review.imageUrl} alt={review.title} />}
              <h2>제목: {review.title}</h2>
              <p>설명: {review.description}</p>
            </div>
          ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={reviewData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            value={reviewData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="file"
            name="imageUrl"
            value={reviewData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}
