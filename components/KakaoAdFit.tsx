'use client';

import { useEffect, useRef } from 'react';
import { KakaoAdFitProps } from '../lib/types/kakaoAdFit';

export function KakaoAdFit({ unit, width, height, disabled }: KakaoAdFitProps) {
  const scriptElementWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!disabled) {
      const script = document.createElement('script');
      script.setAttribute('src', 'https://t1.daumcdn.net/kas/static/ba.min.js');
      scriptElementWrapper.current?.appendChild(script);

      return () => {
        const globalAdfit = (window as any).adfit;
        if (globalAdfit) globalAdfit.destroy(unit);
      };
    }
  }, [disabled, unit]);

  return (
    <div ref={scriptElementWrapper}>
      <ins
        className="kakao_ad_area"
        style={{ display: 'none' }}
        data-ad-unit={unit}
        data-ad-width={width}
        data-ad-height={height}
      ></ins>
    </div>
  );
}
