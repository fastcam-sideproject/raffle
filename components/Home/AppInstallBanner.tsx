import Image from 'next/image';
import React from 'react';

export default function AppInstallBanner() {
  return (
    <section className="min-h-[20rem] flex flex-col items-center justify-center bg-blue-50">
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-3xl font-semibold mb-4">AllYouRaffle앱 설치하기</h3>
        <p className="mb-4 text-xl">앱을 설치하고 더 많은 기능을 이용해보세요!</p>
        <a
          href="https://play.google.com/store/apps/details?id=com.allyouraffle.allyouraffle.android&pcampaignid=web_share"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/image/logo/googleplay.png"
            alt="구글 플레이 로고 이미지"
            width={250}
            height={100}
          />
        </a>
      </div>
    </section>
  );
}
