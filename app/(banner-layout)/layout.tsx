import Banner from '../../components/Banner/Banner';
import HeaderNav from '../../components/Header/HeaderNav';

export default function BannerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderNav />
      <Banner />
      {children}
    </>
  );
}
