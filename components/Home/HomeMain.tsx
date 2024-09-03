'use client';

import ItemPopular from '../Items/ItemPopular';
import { KakaoAdFit } from '../KakaoAdFit';
import HomeHero from './HomeHero';
import HomeInfo from './HomeInfo';

export default function HomeMain() {
  return (
    <main>
      <HomeHero />
      <section className="w-full flex justify-center my-6">
        <KakaoAdFit unit="DAN-qvc3rvDUKVUobMDZ" width="300" height="250" disabled={false} />
      </section>
      <ItemPopular />
      <HomeInfo />
    </main>
  );
}
