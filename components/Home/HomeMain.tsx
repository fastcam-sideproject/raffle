'use client';

import ItemPopular from '../Items/ItemPopular';
import { KakaoAdFit } from '../KakaoAdFit';
import HomeHero from './HomeHero';
import HomeInfo from './HomeInfo';

export default function HomeMain() {
  return (
    <main>
      <HomeHero />
      <ItemPopular />
      <HomeInfo />
    </main>
  );
}
