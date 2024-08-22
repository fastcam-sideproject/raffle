import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Footer from '../components/Footer/Footer';
import ReactQueryProviders from '../lib/hooks/useReactQuery';

const pretendard = localFont({
  src: [
    {
      path: '../public/fonts/Pretendard-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://allyouraffle.co.kr'),
  title: {
    template: 'All Your Raffle | %s',
    default: 'All Your Raffle',
  },
  description: '광고 보시고 당첨의 행운을 잡으세요!',
  openGraph: {
    title: 'All Your Raffle',
    description: '광고 보시고 당첨의 행운을 잡으세요!',
    type: 'website',
    url: 'https://allyouraffle.co.kr',
    siteName: 'All Your Raffle',
    locale: 'ko_KR',
  },
  twitter: {
    title: 'All Your Raffle',
    description: '광고 보시고 당첨의 행운을 잡으세요!',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} text-gray-900`}>
        <ReactQueryProviders>
          {children}
          <Footer />
        </ReactQueryProviders>
      </body>
    </html>
  );
}
