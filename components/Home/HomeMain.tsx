'use client';

import { Suspense } from 'react';
import ItemPopular from '../Items/ItemPopular';
import HomeHero from './HomeHero';
import HomeInfo from './HomeInfo';

export default function HomeMain() {
  return (
    <main>
      <HomeHero />
      <Suspense fallback={<div>Loading data...</div>}>
        <ItemPopular />
      </Suspense>

      <HomeInfo />
    </main>
  );
}
