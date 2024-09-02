import Banner from '../../components/Banner/Banner';
import HeaderNav from '../../components/Header/HeaderNav';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderNav />
      {children}
    </>
  );
}
