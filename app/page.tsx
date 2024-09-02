import HomeMain from '../components/Home/HomeMain';
import HeaderNav from '../components/Header/HeaderNav';
import AuthHandler from '../components/AuthHandler';
import { KakaoAdFit } from '../components/KakaoAdFit';

export default function HomePage() {
  return (
    <>
      <HeaderNav />
      <HomeMain />
      <AuthHandler />
      <KakaoAdFit unit="DAN-qvc3rvDUKVUobMDZ" width="300" height="250" disabled={false} />
      <KakaoAdFit unit="DAN-OUyn7VXgiTbP3fFn" width="160" height="600" disabled={false} />
    </>
  );
}
