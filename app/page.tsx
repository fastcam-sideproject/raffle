'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('access_token');

    if (token) {
      localStorage.setItem('access_token', token);
      router.replace('/');
    }
  }, []);
  return <div>123</div>;
}
