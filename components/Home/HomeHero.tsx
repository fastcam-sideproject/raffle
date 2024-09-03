'use client';

import { useEffect, useState } from 'react';
import Button from '../../lib/common/Button';
import Advertisement from '../Advertisement/Advertisement';
import useAuthStore from '../../lib/store/useAuthStore';

export default function HomeHero() {
  const [isShowAdvertisement, setIsShowAdvertisement] = useState<boolean>(false);
  const userToken = useAuthStore((state) => state.userToken);

  const handleShowAdvertisement = () => {
    if (userToken) {
      setIsShowAdvertisement(true);
    } else {
      alert('로그인해주세요.');
    }
  };

  useEffect(() => {
    if (!isShowAdvertisement) {
      setIsShowAdvertisement(false);
    }
  }, [isShowAdvertisement]);

  return (
    <>
      <section className="min-h-[20rem] flex flex-col items-center justify-center bg-blue-50">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-lg md:text-3xl font-bold mb-4 text-shadow-white-shadow">
            All You Raffle 에 오신것을 환영합니다
          </h2>
          <p className="md:text-xl mb-6 text-shadow-white-shadow">행운을 받아가세요!</p>
          {/* <button type="button" className="bg-primary text-white px-6 py-3 rounded-full shadow-2xl">
        <Link href="/shop">Get Started</Link>
      </button> */}
          <div className="pt-4">
            <Button
              label="광고 보고 응모권 추가하기"
              width="auto"
              fontSize="base"
              className="bg-primary hover:bg-blue-500"
              type="button"
              onClick={handleShowAdvertisement}
            />
          </div>
        </div>
        {userToken && isShowAdvertisement && (
          <Advertisement onClose={() => setIsShowAdvertisement(false)} />
        )}
      </section>
    </>
  );
}
