'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import HomeHero from './HomeHero';
import HomeInfo from './HomeInfo';
import AppInstallBanner from './AppInstallBanner';

const ItemPopular = dynamic(() => import('../Items/ItemPopular'), { ssr: false });

export default function HomeMain() {
  return (
    <main>
      <HomeHero />
      <Suspense fallback={<div>Loading data...</div>}>
        <ItemPopular />
      </Suspense>
      <HomeInfo />
      <AppInstallBanner />
    </main>
  );
}
