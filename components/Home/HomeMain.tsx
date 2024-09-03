'use client';

import ItemPopular from '../Items/ItemPopular';
import HomeHero from './HomeHero';
import HomeInfo from './HomeInfo';

export default function HomeMain() {
  return (
    <>
      <HomeHero />
      <ItemPopular />
      <HomeInfo />
    </>
  );
}
