import HomeMain from '../components/Home/HomeMain';
import HeaderNav from '../components/Header/HeaderNav';
import AuthHandler from '../components/AuthHandler';
import Advertisement from '../components/Advertisement/Advertisement';

export default function HomePage() {
  return (
    <>
      <HeaderNav />
      <HomeMain />
      <AuthHandler />
    </>
  );
}
